import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test('should complete full user journey from login to analytics', async ({ page }) => {
    // Step 1: Login
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
    
    // Quick login for demo
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Step 2: Verify dashboard
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByText(/john/i)).toBeVisible(); // User profile
    
    // Step 3: Navigate to Users page
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
    await expect(page.getByText(/users/i)).toBeVisible();
    
    // Verify users table
    await expect(page.getByText(/john\.doe@example\.com/i)).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /name/i })).toBeVisible();
    
    // Step 4: Navigate to Analytics
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
    await expect(page.getByText(/analytics/i)).toBeVisible();
    
    // Verify analytics tabs
    await expect(page.getByRole('tab', { name: /overview/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /trends/i })).toBeVisible();
    
    // Step 5: Test tab navigation
    await page.getByRole('tab', { name: /trends/i }).click();
    await expect(page.getByRole('tab', { name: /trends/i })).toHaveAttribute('aria-selected', 'true');
    
    await page.getByRole('tab', { name: /geographic/i }).click();
    await expect(page.getByRole('tab', { name: /geographic/i })).toHaveAttribute('aria-selected', 'true');
    
    // Step 6: Navigate to Reports
    await page.getByRole('link', { name: /reports/i }).click();
    await expect(page).toHaveURL(/.*reports/);
    await expect(page.getByText(/reports/i)).toBeVisible();
    
    // Step 7: Navigate to Settings
    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.getByText(/settings/i)).toBeVisible();
    
    // Step 8: Logout
    await page.getByText(/sign out/i).click();
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
  });

  test('should handle registration flow', async ({ page }) => {
    // Step 1: Start at login page
    await page.goto('/auth/login');
    
    // Step 2: Navigate to registration
    await page.getByRole('link', { name: /sign up/i }).click();
    await expect(page).toHaveURL(/.*register/);
    await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
    
    // Step 3: Fill registration form
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByLabel(/company/i).fill('Test Company');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    await page.getByLabel(/i agree to the/i).check();
    
    // Step 4: Submit form (would redirect to dashboard in real app)
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Step 5: Navigate back to login
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('should handle responsive navigation', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Verify mobile navigation
      await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
    }
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Dashboard should still be functional
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Full navigation should be visible
    await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key on links
    await page.keyboard.press('Enter');
    
    // Should navigate to the focused link
    // Note: This test might need adjustment based on actual focus behavior
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test invalid login attempt
    await page.goto('/auth/login');
    
    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should show validation (browser native or custom)
    const emailInput = page.getByLabel(/email address/i);
    await expect(emailInput).toHaveAttribute('required');
    
    // Test with invalid credentials
    await emailInput.fill('invalid@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should handle error gracefully (no crash)
    await expect(page).toHaveURL(/.*login/);
  });
});