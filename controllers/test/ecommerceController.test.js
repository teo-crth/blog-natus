require("dotenv").config();
const request = require('supertest');
const app = require('../../index');

const PORT = process.env.PORT_TEST;

let server;

beforeAll((done) => {
    server = app.listen(PORT, () => {
        console.log('Serveur démarré sur le port 3000');
        done();
    });
});

afterAll((done) => {
    server.close(() => {
        console.log('Serveur arrêté');
        done();
    });
});

describe('Ecommerce Controller', () => {
  it('should render the books page', async () => {
    const response = await request(app).get('/livres');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Nos Livres coup de Coeur')
  });


  it('should render a single book page if the book exists', async () => {
    const bookId = 1;
    const response = await request(app).get(`/livres/${bookId}`);
    expect(response.status).toBe(200);
  });

  it('should return 404 if the book does not exist', async () => {
    const bookId = 999;
    const response = await request(app).get(`/livres/${bookId}`);
    expect(response.status).toBe(404);
  });

  it('should render the shopping cart page', async () => {
    const response = await request(app).get('/livres/panier');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Votre panier')
  });

  it('should add a book to the shopping cart', async () => {
    const bookId = 1; 
    const response = await request(app).get(`/livres/panier/${bookId}`);
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/livres/panier'); 
  });

  it('should remove a book from the shopping cart', async () => {
    const bookId = 1; 
    const response = await request(app).get(`/livres/panier/remove/${bookId}`);
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/livres/panier'); 
  });

  it('should render the login page', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toBe(200);
  });
});
