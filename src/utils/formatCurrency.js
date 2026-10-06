export function formatCurrency(amount) {
  return `${Number(amount).toLocaleString("en-US")} ETB`;
}