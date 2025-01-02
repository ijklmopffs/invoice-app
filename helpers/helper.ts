function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function formatMoney(amount: number): string {
  const [whole, decimal] = amount.toString().split(".");

  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}

export { formatDate, capitalizeFirstLetter, formatMoney };
