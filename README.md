# artin-alimohammadi

وب‌سایت شخصی و پورتفولیوی آرتین علی‌محمدی داورانی.

🔗 **https://artinalimohammadi.ir**

## ساختار

| مسیر | توضیح |
|---|---|
| `index.html` | صفحهٔ اصلی پورتفولیو |
| `admin.html` / `admin.js` / `admin.css` | پنل مدیریت |
| `script.js` / `style.css` | اسکریپت و استایل سایت اصلی |
| `fonts/` | Vazirmatn + Sora (woff2) |
| `vendor/` | three.js |

سایت کاملاً استاتیک است؛ داده‌ها فعلاً در `localStorage` مرورگر نگهداری می‌شوند.

## استقرار

سایت روی nginx سرو می‌شود و فایل‌ها در `/var/www/artinalimohammadi` قرار می‌گیرند.

```bash
scp -r ./* root@<server>:/var/www/artinalimohammadi/
```
