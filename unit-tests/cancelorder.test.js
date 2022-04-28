const expect = require("chai").expect;
const mocha = require("mocha");
const axios = require("axios");

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0TmFtZSI6IlRhaGlyIFR1cmd1dCIsImN1c3RJRCI6IjQzIiwiY3VzdE1haWwiOiJ0YWhpcnR1cmd1dHRAb3V0bG9vay5jb20iLCJpYXQiOjE2MjAxNjE2NDIsImV4cCI6MTYyMDY4MDA0Mn0.g0ygP3o006Kdpq6dTyH_ITrM4X4xZGwytmIJOEumcyQ";

context('Cancelling order system', () =>{
    describe('Cancel order ', () =>{
        
        it('should cancel order', async () => {
            let info = {token, deliveryID: 154};
            let r =  await axios.post("https://gate.c2a.store/general/cancel-order", info);
            expect(r.data.result).to.be.equals(1);
        }).timeout(8000);
        it('should not cancel since token is invalid', async () => {
            let info = {token:"123asd", deliveryID: 154};
            let r =  await axios.post("https://gate.c2a.store/general/cancel-order", info);
            expect(r.data.result).to.be.equals(-2);
        }).timeout(8000);
        it('should not cancel since order status is shipped', async () => {
            let info = {token, deliveryID: 150};
            let r =  await axios.post("https://gate.c2a.store/general/cancel-order", info);
            expect(r.data.result).to.be.equals(-3);
        }).timeout(8000);
        it('should not cancel since order status is completed', async () => {
            let info = {token, deliveryID: 161};
            let r =  await axios.post("https://gate.c2a.store/general/cancel-order", info);
            expect(r.data.result).to.be.equals(-4);
        }).timeout(2000);
        it('should not cancel since query returns null', async () => {
            let info = {token, deliveryID: 165};
            let r =  await axios.post("https://gate.c2a.store/general/cancel-order", info);
            expect(r.data.result).to.be.equals(-5);
        }).timeout(8000);

    });

});