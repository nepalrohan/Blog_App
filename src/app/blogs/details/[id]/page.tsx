import BlogDetailPageComponent from "@/app/(components)/BlogDetail";



export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <BlogDetailPageComponent id={params.id} />;
}