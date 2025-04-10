import EditBlogPage from "@/app/(components)/BlogEdit";

interface Props {
  params: { id: string };
}

export default function BlogDetailPage({ params }: Props) {
  return <EditBlogPage id={params.id} />;
}