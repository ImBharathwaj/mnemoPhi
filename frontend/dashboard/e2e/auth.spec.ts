import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('should display login page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/MnemoPhi/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
    
    // Check form elements
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /quick login/i })).toBeVisible();
  });

  test('should handle successful login with demo credentials', async ({ page }) => {
    // Click quick login button
    await page.getByRole('button', { name: /quick login/i }).click();
    
    // Wait for navigation to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Check that we're on the dashboard
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('should handle manual login', async ({ page }) => {
    // Fill in login form
    await page.getByLabel(/email address/i).fill('admin@mnemophi.com');
    await page.getByLabel(/password/i).fill('password');
    
    // Submit form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for navigation
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should handle remember me checkbox', async ({ page }) => {
    const rememberMeCheckbox = page.getByLabel(/remember me/i);
    
    // Initially unchecked
    await expect(rememberMeCheckbox).not.toBeChecked();
    
    // Check the checkbox
    await rememberMeCheckbox.check();
    await expect(rememberMeCheckbox).toBeChecked();
  });

  test('should navigate to registration page', async ({ page }) => {
    // Click sign up link
    await page.getByRole('link', { name: /sign up/i }).click();
    
    // Should be on registration page
    await expect(page).toHaveURL(/.*register/);
    await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Check that required fields show validation
    const emailInput = page.getByLabel(/email address/i);
    const passwordInput = page.getByLabel(/password/i);
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });
});

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/register');
  });

  test('should display registration page correctly', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('should handle form input', async ({ page }) => {
    // Fill in registration form
    await page.getByLabel(/first name/i).fill('John');
    await page.getByLabel(/last name/i).fill('Doe');
    await page.getByLabel(/email address/i).fill('john@example.com');
    await page.getByLabel(/company/i).fill('Test Company');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    
    // Check terms checkbox
    await page.getByLabel(/i agree to the/i).check();
    
    // Verify form values
    await expect(page.getByLabel(/first name/i)).toHaveValue('John');
    await expect(page.getByLabel(/email address/i)).toHaveValue('john@example.com');
  });

  test('should navigate back to login', async ({ page }) => {
    // Click sign in link
    await page.getByRole('link', { name: /sign in/i }).click();
    
    // Should be on login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
  });
});