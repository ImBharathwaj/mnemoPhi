import { test, expect } from '@playwright/test';

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to users page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
  });

  test('should display users page correctly', async ({ page }) => {
    // Check page title
    await expect(page.getByText(/users/i)).toBeVisible();
    
    // Check search and filter controls
    await expect(page.getByPlaceholder(/search users/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /filter/i })).toBeVisible();
    
    // Check table headers
    await expect(page.getByRole('columnheader', { name: /name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /status/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /consent ratio/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /actions/i })).toBeVisible();
  });

  test('should display user data in table', async ({ page }) => {
    // Check that user data is displayed
    await expect(page.getByText(/john\.doe@example\.com/i)).toBeVisible();
    await expect(page.getByText(/jane\.smith@example\.com/i)).toBeVisible();
    
    // Check status indicators
    await expect(page.getByText(/active/i)).toBeVisible();
    await expect(page.getByText(/pending/i)).toBeVisible();
  });

  test('should handle user search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search users/i);
    
    // Search for a specific user
    await searchInput.fill('john');
    
    // Should filter results (implementation dependent)
    await expect(searchInput).toHaveValue('john');
  });

  test('should handle user actions', async ({ page }) => {
    // Check that action buttons are present
    const actionButtons = page.getByRole('button', { name: /view|edit|delete/i });
    await expect(actionButtons.first()).toBeVisible();
  });


  test('should handle export functionality', async ({ page }) => {
    // Check export button
    await expect(page.getByRole('button', { name: /export/i })).toBeVisible();
  });
});

test.describe('User Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to users page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
  });

  test('should navigate to user detail page', async ({ page }) => {
    // Click on first user's view button
    const viewButton = page.getByRole('button', { name: /view/i }).first();
    await viewButton.click();
    
    // Should be on user detail page
    await expect(page).toHaveURL(/.*users\/\d+/);
    await expect(page.getByText(/user details/i)).toBeVisible();
  });

  test('should display user information', async ({ page }) => {
    // Navigate to user detail page
    await page.getByRole('button', { name: /view/i }).first().click();
    
    // Check user information sections
    await expect(page.getByText(/personal information/i)).toBeVisible();
    await expect(page.getByText(/consent history/i)).toBeVisible();
    await expect(page.getByText(/activity log/i)).toBeVisible();
  });
});