import ReviewPageClient from "./ReviewPageClient"

export async function generateStaticParams() {
  const params = []
  for (let i = 1; i <= 330; i++) {
    params.push({ id: i.toString() })
  }
  return params
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  return <ReviewPageClient params={params} />
}