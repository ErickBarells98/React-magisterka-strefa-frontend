import axios from 'axios';

const jwtAxios = axios.create();

jwtAxios.defaults.baseURL = 'https://magisterstrefaapi.azurewebsites.net/';
jwtAxios.defaults.headers = {"Access-Control-Allow-Origin": "*"};

//Biorę bazową konfigurację axiosa i nadpisuje przy wysyłaniu żądania aby dodawał Bearer do autoryzacji, 
//flage again dla powrótrzenia żądania i użycie Credentials.
//Context jest parametrem przekazywanym przy kazdym zdaniu aby miec dostep do danych użytkownika z UserContext.

jwtAxios.interceptors.request.use(
    config => {
        const {context} = config;
        config.headers.Authorization = 'Bearer ' + context.user.jwt;
        config.again = true;
        config.withCredentials = true;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//Podczas odpowiedzi, wykorzystująć własnego axiosa, jeśli wszystko poszło pomyślnie zwraca odpowiedź.
//1. Jeśli zaś się nie udało zapisuje orginalne żądanie na później.
//2. Sprawdzam statusy czy zostało odrzucone z powodu wygasniecia JWT.
//3. Puszczam żądanie o odnowienie JWT, podmieniam je w contexcie i w oryginalnym requescie.
//4. Ustawiam aby żądanie nie zostało ponowione kolejny raz, i wywołuje je ponownie domyślnym axiosem.
//jeśli odrzucone (401) wylogowuje.

jwtAxios.interceptors.response.use(
    httpObject => {
        return httpObject;
    },
    error => {
        const orginalRequest = error.config;
        if(error.response && error.response.status === 401 && orginalRequest.again){

            const { context } = orginalRequest;
            return axios.post('/api/auth/refresh',{},{withCredentials:true})
                    .then(response => {
                        context.setJWT(response.data.jwt);
                        orginalRequest.headers.Authorization = 'Bearer ' + response.data.jwt;
                        orginalRequest.again = false;
                        return axios(orginalRequest);
                    })
                    .catch(err => {
                        if(err.response.status === 401){
                            context.logout();
                        }
                        return Promise.reject(err);
                    })

        }else{
            return Promise.reject(error);
        }
    }
)

export default jwtAxios;
