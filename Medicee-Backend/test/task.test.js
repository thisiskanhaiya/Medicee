const chai = require('chai');
const chaihttp = require('chai-http');
const { response } = require('express');
const server = require('../app');

chai.should();
chai.use(chaihttp)

describe("Task POST API",() => {

    it("POST /ContactUs", (done) => {
        const datapart = {
            fullname: "kuldeep Lalsahab2",
            email: "kaadsfdmu@gmail.com",
            contact: 941560054,
            address: "k 57/127", 
            query: "my question is why??"
        }
        const { fullname, email, contact, address, query } = datapart
        chai.request('http://localhost:8000')
            .post('/contactus')
            .send({ fullname, email, contact, address, query})
            .end((err,response)=>{
                response.should.have.status(201);
                response.body.should.be.a('object');
            done();
            });
    });

    it("POST /RegisterUser", (done) => {
        const user = {
            name: "kuldeep Lalsahab",
            email: "kaadsfdmu@gmail.com",
            phone: 941560054,
            password: "kuldeep678@PRINSU", 
            confirm_password: "kuldeep678@PRINSU"
        }
        const { name, email, phone, password, confirm_password } = user
        chai.request('http://localhost:8000')
            .post('/registration_user')
            .send({ name, email, phone, password, confirm_password})
            .end((err,response)=>{
                response.should.have.status(201);
                response.body.should.be.a('object');
            done();
            });
    });
})

describe("Task GET API",() => {

    it("GET /faq", (done) => {
        chai.request('http://localhost:8000')
            .get('/faq/data')
            .end((err,response)=>{
                response.should.have.status(201);
                
            done();
            });
    });

    it("Wrong GET /faq", (done) => {
        
        chai.request('http://localhost:8000')
            .get('/faq/datas')
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            });
    });
    
})

describe("Task PUT API",() => {

    it("PUT /user/update_details", (done) => {
        const email = "kaadsfdmu@gmail.com";
        const user = {
            name: "kuldeep prajapati",
            email: "kaadsfdmu@gmail.com",
            phone: 941560054
        }
        
        chai.request('http://localhost:8000')
            .put('/user/update_details', email)
            .send(user)
            .end((err,response)=>{
                response.should.have.status(201);
            done();
            });
    });

    it("Not update user without name and phone number", (done) => {
        const email = "kaadsfdmu@gmail.com";
        const user = {
            name: "",
            email: "kaadsfdmu@gmail.com",
            phone: 941560054
        }
        
        chai.request('http://localhost:8000')
            .put('/user/update_details', email)
            .send(user)
            .end((err,response)=>{
                response.should.have.status(421);
                response.text.should.be.eq('{"error":"All Field are required"}');
            done();
            });
    });
       
})

describe("Task DELETE API",() => {
    
    it("DELETE User /user/deleteuser", (done) => {

        const email = "kaadsfdmu@gmail.com";
        const user = {
            email: "kaadsfdmu@gmail.com"
        }
        chai.request('http://localhost:8000')
            .post('/user/deleteuser', email)
            .send(user)
            .end((err,response)=>{
                response.should.have.status(201);
                response.text.should.be.eq('{"message":"Deleted Successfully"}');
            done();
            });
    });

    it("Delete Contactus /admin/contact/delete", (done) => {
        const datapart = {
            email: "kaadsfdmu@gmail.com",
            question: "my question is why??",
            answer: "For book appointment in hospital easily."
        }
        const { email, question, answer } = datapart
        chai.request('http://localhost:8000')
            .post('/admin/contact/delete')   
            .send({ email, question, answer })
            .end((err,response)=>{
                response.should.have.status(201);
                response.text.should.be.eq('{"message":"deleted data from contact us page"}');
            done();
            });
    });

       
})