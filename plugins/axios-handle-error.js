// plugins/<function-name>.js
export default (context, inject,redirect) => {
  inject('axioshandler', (e) => {
    const lastFbToken = localStorage.getItem('fbtoken');
    if ((e.response && e.response.status === 401) || (e.toString() === 'Error: Request failed with status code 401')) {
      localStorage.clear();      
      if(lastFbToken){
        localStorage.setItem('fbtoken',lastFbToken);
      }
      window.location.replace('404-qr');
    } else if ((e.response && e.response.status === 400) || (e.toString() === 'Error: Request failed with status code 400')) {
      context.$toast.error('API key not valid. Please pass a valid API key')
    } else if((e.response && e.response.status === 404) || (e.toString() === 'Error: Network Error')) {
      context.$toast.error('Request On Server Not Found');
    } else {
      context.$toast.error('Terjadi Kesalahan Server');
    }
  })
}
