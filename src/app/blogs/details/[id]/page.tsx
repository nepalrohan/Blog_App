import BlogDetailPageComponent from "@/app/(components)/BlogDetail";

interface Props {
  params: { id: string };
}

export default function BlogDetailPage({ params }: Props) {
  return <BlogDetailPageComponent id={params.id} />;
}