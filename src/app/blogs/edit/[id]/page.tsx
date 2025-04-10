import EditBlogPage from "@/app/(components)/BlogEdit";



export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <EditBlogPage id={params.id} />;
}