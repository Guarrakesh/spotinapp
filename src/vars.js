export default {

    //apiUrl: 'https://spotin.herokuapp.com/v1',
    apiUrl: process.env.NODE_ENV === "production" ? "https://spotin.it/v1" : 'http://localhost:3001/v1'
};