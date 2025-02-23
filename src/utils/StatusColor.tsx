export default function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "text-green-600";
    case "In Transit":
      return "text-yellow-600";
    case "Pending":
      return "text-blue-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
