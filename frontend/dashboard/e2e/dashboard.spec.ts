import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should display dashboard correctly', async ({ page }) => {
    // Check main dashboard elements
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    
    // Check sidebar navigation
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /reports/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();
  });

  test('should navigate to users page', async ({ page }) => {
    // Click users link
    await page.getByRole('link', { name: /users/i }).click();
    
    // Should be on users page
    await expect(page).toHaveURL(/.*users/);
    await expect(page.getByRole('heading', { name: /users/i })).toBeVisible();
  });

  test('should navigate to analytics page', async ({ page }) => {
    // Click analytics link
    await page.getByRole('link', { name: /analytics/i }).click();
    
    // Should be on analytics page
    await expect(page).toHaveURL(/.*analytics/);
    await expect(page.getByRole('heading', { name: /analytics/i })).toBeVisible();
  });

  test('should navigate to reports page', async ({ page }) => {
    // Click reports link
    await page.getByRole('link', { name: /reports/i }).click();
    
    // Should be on reports page
    await expect(page).toHaveURL(/.*reports/);
    await expect(page.getByRole('heading', { name: /reports/i })).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    // Click settings link
    await page.getByRole('link', { name: /settings/i }).click();
    
    // Should be on settings page
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
  });

  test('should handle user profile section', async ({ page }) => {
    // Check user profile in sidebar
    await expect(page.getByText(/john/i)).toBeVisible();
    await expect(page.getByText(/john\.doe@example\.com/i)).toBeVisible();
    
    // Check sign out button
    await expect(page.getByText(/sign out/i)).toBeVisible();
  });

  test('should handle logout', async ({ page }) => {
    // Click sign out
    await page.getByText(/sign out/i).click();
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
  });
});

test.describe('Dashboard Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that mobile menu button is visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    
    // Check that sidebar is hidden on mobile
    const sidebar = page.locator('[data-testid="sidebar"]').or(page.locator('nav'));
    // Note: This test might need adjustment based on actual mobile implementation
  });

  test('should work on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Dashboard should still be functional
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
  });
});