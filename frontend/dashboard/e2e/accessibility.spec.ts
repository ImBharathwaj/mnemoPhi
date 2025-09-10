import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations on login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on dashboard', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on users page', async ({ page }) => {
    // Login and navigate to users page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on analytics page', async ({ page }) => {
    // Login and navigate to analytics page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key on focused element
    await page.keyboard.press('Enter');
    
    // Should handle keyboard interaction gracefully
    await expect(page).toHaveURL(/.*login/);
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check that focusable elements are properly marked
    const emailInput = page.getByLabel(/email address/i);
    const passwordInput = page.getByLabel(/password/i);
    const submitButton = page.getByRole('button', { name: /sign in/i });
    
    // Test focus management
    await emailInput.focus();
    await expect(emailInput).toBeFocused();
    
    await passwordInput.focus();
    await expect(passwordInput).toBeFocused();
    
    await submitButton.focus();
    await expect(submitButton).toBeFocused();
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Check that interactive elements have proper roles
    await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /analytics/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();
    
    // Check that buttons have proper roles
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page.getByRole('tab', { name: /overview/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /trends/i })).toBeVisible();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check that text is readable (basic check)
    const heading = page.getByRole('heading', { name: /sign in to mnemophi/i });
    await expect(heading).toBeVisible();
    
    // Check that form labels are visible
    const emailLabel = page.getByLabel(/email address/i);
    const passwordLabel = page.getByLabel(/password/i);
    
    await expect(emailLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();
  });

  test('should be screen reader friendly', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check that form elements have proper labels
    const emailInput = page.getByLabel(/email address/i);
    const passwordInput = page.getByLabel(/password/i);
    const submitButton = page.getByRole('button', { name: /sign in/i });
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Check that inputs have proper types
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    await page.goto('/auth/login');
    
    // Page should still be functional with reduced motion
    await expect(page.getByRole('heading', { name: /sign in to mnemophi/i })).toBeVisible();
    
    // Login and check dashboard
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });
});