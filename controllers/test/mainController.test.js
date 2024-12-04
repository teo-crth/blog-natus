const request = require('supertest');
const express = require('express');
const path = require('path');
const mainController = require('../mainController');
const articleData = require('../../data/articles.json');
const youtubeChanelsData = require('../../data/youtubeChanels.json');
require("dotenv").config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

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

// Routes
app.get('/', mainController.getHomePage);
app.get('/contact', mainController.getContactPage);
app.get('/articles', mainController.getArticlesPage);
app.get('/lexique', mainController.getLexiquePage);
app.get('/nos-allies', mainController.getYoutubePage);
app.get('/article/:articleName', mainController.getSingleArticle);
app.get('/category/:categoryArticle', mainController.getCategoryPage);
app.use(mainController.get404Page);

// Test cases
describe('Main Controller', () => {
  it('should render home page with articles', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Le blog en lien avec la nature');
  });

  it('should render contact page', async () => {
    const response = await request(app).get('/contact');
    expect(response.status).toBe(200);
    expect(response.text).toContain('contact');
  });

  it('should render articles page', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toBe(200);
    expect(response.text).toContain('articles');
  });

  it('should render lexique page', async () => {
    const response = await request(app).get('/lexique');
    expect(response.status).toBe(200);
    expect(response.text).toContain('lexique');
  });

  it('should render youtube allies page', async () => {
    const response = await request(app).get('/nos-allies');
    expect(response.status).toBe(200);
    expect(response.text).toContain('nos-allies');
  });

  it('should render single article page if article exists', async () => {
    const articlePath = articleData[0].path;
    const articleName = articleData[0].title;
    const response = await request(app).get(`/article/${articlePath}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain(`${articleName}`);
  });

  it('should return 404 if article does not exist', async () => {
    const response = await request(app).get('/article/non-existing-article');
    expect(response.status).toBe(404);
    expect(response.text).toContain('404');
  });

  it('should render category page with articles of that category', async () => {
    const categoryOfArticle = articleData[0].category;
    const response = await request(app).get(`/category/${categoryOfArticle}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain('category');
  });

  it('should return 404 for non-existing routes', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
    expect(response.text).toContain('404');
  });
});
