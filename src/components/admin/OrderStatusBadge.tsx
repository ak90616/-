const STATUS_LABEL: Record<string, string> = {
  PENDING: "待處理",
  PAID: "已付款",
  SHIPPED: "已出貨",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
};

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STATUS_STYLE[status] ?? "bg-gray-100 text-gray-800"
      }`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export { STATUS_LABEL };
