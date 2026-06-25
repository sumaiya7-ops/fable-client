import EmptyState from "../../../components/shared/EmptyState";

export default function BookmarksPage() {
  const bookmarks = [];

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No Bookmarks"
        subtitle="Save ebooks to read later."
      />
    );
  }

  return <div className="text-gray-800">Bookmarks Data</div>;
}