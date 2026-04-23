import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('полный путь пользователя: от сбора бургера до получения информации о заказе', async ({
    page,
  }) => {
    // Авторизуемся перед тестом
    await page.goto('/login');
    await page.fill('input[type="email"]', 'parkhanton@gmail.com');
    await page.fill('input[type="password"]', 'qwe123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');


    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Начинки' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Соусы' })).toBeVisible();

    await expect(page.locator('text=Добавьте булку').first()).toBeVisible();
    await expect(page.locator('text=Добавьте начинку')).toBeVisible();

    const bunCard = page.locator('[class*="burger-ingredients-card"]').first();
    const bunDropZone = page.getByTestId('constructor-drop-zone').first();

    await bunCard.dragTo(bunDropZone);

    await expect(page.locator('text=Добавьте булку').first()).not.toBeVisible();

    // Нажимаем на nav элемент "Начинки" для переключения секции
    await page.locator('nav').getByText('Начинки').click();

    const mainCard = page.locator('[class*="burger-ingredients-card"]').nth(5);
    const middleDropZone = page.getByTestId('constructor-drop-zone').nth(1);

    await mainCard.dragTo(middleDropZone);

    await expect(page.locator('text=Добавьте начинку')).not.toBeVisible();

    const totalPrice = page.locator('.text_type_digits-medium');
    await expect(totalPrice).not.toHaveText('0');

    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
    await expect(orderButton).toBeEnabled();

    await orderButton.click();

    await expect(page.locator('[class*="modal"]').first()).toBeVisible();
    await expect(page.locator('text=идентификатор заказа')).toBeVisible();

    const closeButton = page.locator('[class*="modal_header"] svg');
    await closeButton.click();

    await expect(page.locator('[class*="modal"]').first()).not.toBeVisible();

    await expect(page.locator('text=Добавьте булку').first()).toBeVisible();
    await expect(page.locator('text=Добавьте начинку')).toBeVisible();
  });
});
