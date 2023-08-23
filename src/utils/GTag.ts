type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? ``

export const pageview = (url: URL): void => {
  gtag(`config`, GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: GTagEvent): void => {
  gtag(`event`, action, {
    event_category: category,
    event_label: label,
    value,
  })
}
