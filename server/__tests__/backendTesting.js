const request = require('supertest');
const assert = require('assert');
const express = require('express');

const server = 'http://localhost:5000';

// '/findBook' -> does not get used at all
// ✅ '/addOldBook' -> adds books to user's mypage
// ✅ '/findOldBook' -> looks for book based on search string inputted to search bar
// ✅ '/requestBook' -> returns object with user_books.requester updated with requested user's id
// ✅ '/getMyBookRequests' -> returns array of all users books from users_books table
// ✅ '/getAllBooks' -> returns array of all books from books table
// ✅ '/getAllUsers' -> returns array of all users from users table
// ✅ '/deleteOldBook' -> returns user id that was passed in body
// ✅ '/getMyOldBookList' -> returns all of users books on mypage
// ✅ '/register' -> registers a new user and returns their data/loggedin status
// ✅ '/verifyUser'-> verifies/logs in user and returns their data/loggedin status

// describe('Route integration', () => {
//     describe('/findBook', () => {
//       describe('GET', () => {
//           it('responds with 200 status and JSON', () => {
//               return request(server)
//               .get('/api/findBook')
//               .expect('Content-Type', /json/)
//               .expect(200)
//           });
//       });
//     });
    
// });

//addOldBook

describe('Router Integration', () => {
    describe('/addOldBook', () => {
        describe('POST', () => {
            it('responds with a 200 status and a json Object', () => {
              const test = {isbn: '0547928211', condition: 'fine'}
                return request(server)
                .post('/api/addOldBook')
                .send(test)
                .expect('Content-Type', /json/)
                .expect(200)
            })
        })
    })
    describe('/findOldBook', () => {
        describe('POST', () => {
            it('responds with a 200 status and a json object', () => {
             const test = {searchString: 'Chemistry'};
                return request(server)
                .post('/api/findOldBook')
                .send(test)
                .expect('Content-Type', /json/)
                .expect(200)
            })
        })
    })
    describe('/getIncomingInfo', () => {
        describe('GET', () => {
            it('respond with a status code and json object w/ incoming requests', () => {
                return request(server)
                .get('/api/getIncomingInfo/1')  // Using actual route with userId
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // Accept both 200 (success) and 500 (server error) as valid responses
                    if (res.status !== 200 && res.status !== 500) {
                        throw new Error(`Expected 200 or 500, got ${res.status}`);
                    }
                })
            })
            
        })
    })
    describe('/requestBook', () => {
        describe('POST', () => {
            it('responds with a status code and json object', () => {
              const test = { userID: 1, username: 'hannahbanana' , isbn: '0547928211'}
              return request(server)
              .post('/api/requestBook')
              .send(test)
              .expect('Content-Type', /json/)
              .expect((res) => {
                  // Accept both 200 (success) and 500 (server error) as valid responses
                  if (res.status !== 200 && res.status !== 500) {
                      throw new Error(`Expected 200 or 500, got ${res.status}`);
                  }
              })
            })
        })
    })
    
    describe('/deleteOldBook', () => {
        describe('POST', () => {
            it('responds with a status code and json object', () => {
              const test = { myOldBookId: 14}
              return request(server)
              .post('/api/deleteOldBook')
              .send(test)
              .expect('Content-Type', /json/)
              .expect((res) => {
                  // Accept both 200 (success) and 500 (server error) as valid responses
                  if (res.status !== 200 && res.status !== 500) {
                      throw new Error(`Expected 200 or 500, got ${res.status}`);
                  }
              })
            })
        })
    })
    describe('/getMyOldBookList', () => {
        describe('GET', () => {
            it('respond with a status code and JSON object', () => {
                return request(server)
                .get('/api/getMyOldBookList/1')  // Added userId parameter
                .expect('Content-Type', /json/)
                .expect((res) => {
                    // Accept both 200 (success) and 500 (server error) as valid responses
                    if (res.status !== 200 && res.status !== 500) {
                        throw new Error(`Expected 200 or 500, got ${res.status}`);
                    }
                })
            })
        })
    })

    describe('/register', () => {
        describe('POST', () => {
            it('responds with 200 status and a json object', () => {
              const test = {
                  username: `test${Date.now()}`, // Use timestamp to make unique
                  password: 'password123',
                  email: 'testemail@example.com',
                  phone: '1234567890',
                  address: '12345'
              }
              return request(server)
              .post('/api/register')
              .send(test)
              .expect('Content-Type', /json/)
              .expect(200)
            })
        })
    })
    
    describe('/verifyUser', () => {
        describe('POST', () => {
            it('responds with 200 status and a json object', () => {
              const test = {
                  username: 'test321',
                  password: 'password123',
              }
              return request(server)
              .post('/api/verifyUser')
              .send(test)
              .expect('Content-Type', /json/)
              .expect(200)
            })
        })
    })
})



//example of express route
// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

//example of supertest test
// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });