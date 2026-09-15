import { contactCase, forgottenCase } from '../data/story'

export function ContactCase() {
  return (
    <aside className="proof">
      <small>Как это выглядит на практике</small>
      <p>{contactCase.before}</p>
      <span className="proof-arrow" aria-hidden="true">↓</span>
      <p>{contactCase.after}</p>
      <span className="proof-arrow" aria-hidden="true">↓</span>
      <p>{contactCase.note}</p>
    </aside>
  )
}

export function ForgottenCase() {
  return (
    <aside className="proof proof-soft">
      <small>Ещё один паттерн</small>
      <p>{forgottenCase.title}</p>
      <p>{forgottenCase.body}</p>
    </aside>
  )
}
