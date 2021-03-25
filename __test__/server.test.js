import request from 'supertest';
import app from '../src/server/index';

describe('api', () => {
    describe('get /all', () => {
      it('should return a 200', () => {
        request(app).get('/apll').then((res) => {
          expect(res.statusCode).toBe(200);
        });
      });
    });
  });