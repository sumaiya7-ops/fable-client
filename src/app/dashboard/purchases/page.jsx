import EmptyState from "../../../components/shared/EmptyState";

export default function PurchasesPage() {

  const purchases = [];

  if (purchases.length === 0) {
    return (
      <EmptyState
        title="No Purchases Yet"
        subtitle="You haven't purchased any ebooks."
      />
    );
  }

  return (
    <div>
      Purchase Data
    </div>
  );
}