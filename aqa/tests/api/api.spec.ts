import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Automation Exercise - Expanded API Testing Suite', () => {

  // --- 1. GET: All Products List (Positive) ---
  test('TC_API_001: Get All Products List successfully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/productsList`);
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
  });

  // --- 2. POST: Search Product with Parameter (Positive) ---
  test('TC_API_002: POST to Search Product with valid search_product parameter', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`, {
      form: { search_product: 'tshirt' }
    });
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
  });

  // --- 3. POST: Search Product Missing Parameter (Negative) ---
  test('TC_API_003: POST to Search Product without mandatory parameter', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`, {
      form: {} // Intentionally blank
    });
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });

  // --- 4. POST: Invalid HTTP Method on Products List (Negative) ---
  test('TC_API_004: POST to All Products List returns 405 Method Not Allowed', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/productsList`);
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });

  // --- 5. POST: Verify Login with Invalid Credentials (Negative) ---
  test('TC_API_005: POST to Verify Login with invalid details returns 404', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/verifyLogin`, {
      form: {
        email: 'this_user_does_not_exist_12345@gmail.com',
        password: 'wrongpassword'
      }
    });
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');
  });

});