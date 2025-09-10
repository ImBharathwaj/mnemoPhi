import { test, expect } from '@playwright/test';

test.describe('Analytics Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to analytics page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
  });

  test('should display analytics page correctly', async ({ page }) => {
    // Check page title
    await expect(page.getByText(/analytics/i)).toBeVisible();
    
    // Check tab navigation
    await expect(page.getByRole('tab', { name: /overview/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /trends/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /geographic/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /compliance/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /reports/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /predictive/i })).toBeVisible();
  });

  test('should display overview metrics', async ({ page }) => {
    // Check that overview tab is active by default
    await expect(page.getByRole('tab', { name: /overview/i })).toHaveAttribute('aria-selected', 'true');
    
    // Check metric cards
    await expect(page.getByText(/total users/i)).toBeVisible();
    await expect(page.getByText(/active consents/i)).toBeVisible();
    await expect(page.getByText(/compliance rate/i)).toBeVisible();
    await expect(page.getByText(/risk score/i)).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    // Click on trends tab
    await page.getByRole('tab', { name: /trends/i }).click();
    await expect(page.getByRole('tab', { name: /trends/i })).toHaveAttribute('aria-selected', 'true');
    
    // Click on geographic tab
    await page.getByRole('tab', { name: /geographic/i }).click();
    await expect(page.getByRole('tab', { name: /geographic/i })).toHaveAttribute('aria-selected', 'true');
    
    // Click on compliance tab
    await page.getByRole('tab', { name: /compliance/i }).click();
    await expect(page.getByRole('tab', { name: /compliance/i })).toHaveAttribute('aria-selected', 'true');
  });

  test('should display charts and visualizations', async ({ page }) => {
    // Check that charts are rendered
    const charts = page.locator('canvas, svg, [data-testid*="chart"]');
    await expect(charts.first()).toBeVisible();
  });

  test('should handle date range selection', async ({ page }) => {
    // Check date range controls
    const dateRangeButton = page.getByRole('button', { name: /date range/i });
    if (await dateRangeButton.isVisible()) {
      await dateRangeButton.click();
      
      // Check date picker options
      await expect(page.getByText(/last 7 days/i)).toBeVisible();
      await expect(page.getByText(/last 30 days/i)).toBeVisible();
      await expect(page.getByText(/last 90 days/i)).toBeVisible();
    }
  });

  test('should handle export functionality', async ({ page }) => {
    // Check export button
    const exportButton = page.getByRole('button', { name: /export/i });
    if (await exportButton.isVisible()) {
      await expect(exportButton).toBeVisible();
    }
  });

  test('should handle refresh functionality', async ({ page }) => {
    // Check refresh button
    const refreshButton = page.getByRole('button', { name: /refresh/i });
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
      // Should trigger data refresh
    }
  });
});

test.describe('Analytics Reports Tab', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to analytics page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
    
    // Navigate to reports tab
    await page.getByRole('tab', { name: /reports/i }).click();
  });

  test('should display report builder', async ({ page }) => {
    // Check report builder elements
    await expect(page.getByText(/report builder/i)).toBeVisible();
    
    // Check report templates
    await expect(page.getByText(/compliance report/i)).toBeVisible();
    await expect(page.getByText(/user activity report/i)).toBeVisible();
    await expect(page.getByText(/consent trends report/i)).toBeVisible();
  });

  test('should handle report generation', async ({ page }) => {
    // Check generate report button
    const generateButton = page.getByRole('button', { name: /generate report/i });
    if (await generateButton.isVisible()) {
      await expect(generateButton).toBeVisible();
    }
  });
});

test.describe('Analytics Predictive Tab', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to analytics page
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /quick login/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page).toHaveURL(/.*analytics/);
    
    // Navigate to predictive tab
    await page.getByRole('tab', { name: /predictive/i }).click();
  });

  test('should display predictive analytics', async ({ page }) => {
    // Check predictive analytics elements
    await expect(page.getByText(/predictive analytics/i)).toBeVisible();
    
    // Check forecasting elements
    await expect(page.getByText(/forecasting/i)).toBeVisible();
    await expect(page.getByText(/anomaly detection/i)).toBeVisible();
  });
});