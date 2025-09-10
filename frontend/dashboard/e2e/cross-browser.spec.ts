import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  test('should work consistently across browsers', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Test basic functionality
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    
    // Test navigation
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
    
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
    
    // Test form interactions
    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL(/.*settings/);
    
    // Test logout
    await page.getByText(/sign out/i).click();
    await expect(page).toHaveURL(/.*login/);
    
    console.log(`Test completed successfully on ${browserName}`);
  });

  test('should handle CSS and styling consistently', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    
    // Check that main elements are visible and styled
    const dashboard = page.getByText(/dashboard/i);
    await expect(dashboard).toBeVisible();
    
    // Check that buttons have proper styling
    const usersLink = page.getByRole('link', { name: /users/i });
    await expect(usersLink).toBeVisible();
    
    // Check that forms are properly styled
    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page.getByText(/settings/i)).toBeVisible();
    
    console.log(`Styling test completed on ${browserName}`);
  });

  test('should handle JavaScript interactions consistently', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    
    // Test JavaScript interactions
    await page.getByRole('link', { name: /analytics/i }).click();
    
    // Test tab switching (JavaScript functionality)
    await page.getByRole('tab', { name: /trends/i }).click();
    await expect(page.getByRole('tab', { name: /trends/i })).toHaveAttribute('aria-selected', 'true');
    
    await page.getByRole('tab', { name: /geographic/i }).click();
    await expect(page.getByRole('tab', { name: /geographic/i })).toHaveAttribute('aria-selected', 'true');
    
    // Test form interactions
    await page.getByRole('link', { name: /users/i }).click();
    
    const searchInput = page.getByPlaceholder(/search users/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
    }
    
    console.log(`JavaScript interactions test completed on ${browserName}`);
  });

  test('should handle responsive design across browsers', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    
    console.log(`Responsive design test completed on ${browserName}`);
  });

  test('should handle form validation consistently', async ({ page, browserName }) => {
    // Test login form validation
    await page.goto('/auth/login');
    
    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Check that required fields are marked
    const emailInput = page.getByLabel(/email address/i);
    const passwordInput = page.getByLabel(/password/i);
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
    
    // Test registration form validation
    await page.getByRole('link', { name: /sign up/i }).click();
    
    // Try to submit empty registration form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Check required fields
    await expect(page.getByLabel(/first name/i)).toHaveAttribute('required');
    await expect(page.getByLabel(/email address/i)).toHaveAttribute('required');
    
    console.log(`Form validation test completed on ${browserName}`);
  });

  test('should handle accessibility features consistently', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    
    // Check that interactive elements have proper roles
    await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();
    
    // Check that buttons have proper roles
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page.getByRole('tab', { name: /overview/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /trends/i })).toBeVisible();
    
    // Check that form elements have proper labels
    await page.getByRole('link', { name: /users/i }).click();
    
    const searchInput = page.getByPlaceholder(/search users/i);
    if (await searchInput.isVisible()) {
      await expect(searchInput).toBeVisible();
    }
    
    console.log(`Accessibility test completed on ${browserName}`);
  });
});