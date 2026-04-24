import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('полный путь пользователя: от сбора бургера до получения информации о заказе', async ({
    context,
    page,
  }) => {

    await page.routeFromHAR('tests/har/constructor.har', {
      update: false,
      url: /https:\/\/new-stellarburgers\.education-services\.ru\/api\/.*/,
    });

    await page.goto('/#/login');
    await page.fill('input[type="email"]', 'parkhanton@gmail.com');
    await page.fill('input[type="password"]', 'qwe123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/#/');

    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Начинки' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Соусы' })).toBeVisible();

    const bunDropZoneEmpty = page.locator('text=Добавьте булку').first();
    const mainDropZoneEmpty = page.locator('text=Добавьте начинку');

    await expect(bunDropZoneEmpty).toBeVisible();
    await expect(mainDropZoneEmpty).toBeVisible();

    const bunCard = page.locator('[class*="burger-ingredients-card"]').first();
    const bunDropZone = page.getByTestId('constructor-drop-zone').first();

    await bunCard.dragTo(bunDropZone);

    await expect(bunDropZoneEmpty).not.toBeVisible();

    await page.locator('nav').getByText('Начинки').click();

    const mainCard = page.locator('[class*="burger-ingredients-card"]').nth(5);
    const middleDropZone = page.getByTestId('constructor-drop-zone').nth(1);

    await mainCard.dragTo(middleDropZone);

    await expect(bunDropZoneEmpty).not.toBeVisible();

    const totalPrice = page.locator('.text_type_digits-medium');
    await expect(totalPrice).not.toHaveText('0');

    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
    await expect(orderButton).toBeEnabled();

    await orderButton.click();

    await expect(page.locator('[class*="modal"]').first()).toBeVisible();

    const orderNumberElement = page.locator('[class*="modal"] .text_type_digits-large');
    const orderNumber = await orderNumberElement.textContent();
    expect(orderNumber).toBe('766');

    const closeButton = page.locator('[class*="modal_header"] svg');
    await closeButton.click();

    await expect(page.locator('[class*="modal"]').first()).not.toBeVisible();

    await expect(bunDropZoneEmpty).toBeVisible();
    await expect(mainDropZoneEmpty).toBeVisible();
  });
});
