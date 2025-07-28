import TicketClientPage from "./TicketClientPage"

export async function generateStaticParams() {
  const params = []
  for (let i = 1; i <= 330; i++) {
    params.push({ id: i.toString() })
  }
  return params
}

export default function TicketPage() {
  return <TicketClientPage />
}