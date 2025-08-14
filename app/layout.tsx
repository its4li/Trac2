import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ردیاب والت کریپتو',
  description: 'تحلیل و ردیابی تراکنش‌های والت کریپتو',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
