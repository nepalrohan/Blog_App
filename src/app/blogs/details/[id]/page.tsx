import BlogDetailPageComponent from "@/app/(components)/BlogDetail";


export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const id = await params.id; 
  return <BlogDetailPageComponent id={id} />;
}


