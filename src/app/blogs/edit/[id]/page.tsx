import EditBlogPage from "@/app/(components)/BlogEdit";



export default async  function BlogDetailPage({ params }: { params: { id: string } }) {
  const id =  await params.id; 

  return <EditBlogPage id={id} />;
}