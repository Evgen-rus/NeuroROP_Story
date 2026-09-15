import { useState } from 'react'
import { Checkpoint } from '../components/Checkpoint'

export function SceneFinal() {
  const [open, setOpen] = useState(false)

  return (
    <div className="chapter chapter-final">
      <Checkpoint id="final" kicker="13" title={<>РОП не может быть<br />внутри каждой сделки.</>}>
        <p>НейроРОП может следить за каждой.</p>
        <p>РОП видит, где нужна помощь. Менеджер понимает, что делать дальше.</p>
        <p>Меньше времени на поиск проблемы. Больше — на решение и продажу.</p>
        <p className="accent-line">НейроРОП не заменяет РОПа и менеджера. Он усиливает их.</p>
      </Checkpoint>
      <div className="final-cta">
        <button type="button" className="pilot" onClick={() => setOpen(true)}>
          Проверить НейроРОП на ваших сделках
        </button>
        <p>Возьмём реальные сделки и покажем, что система увидит в вашем отделе продаж.</p>
      </div>
      {open ? (
        <div className="cta-modal" role="dialog" aria-modal="true" aria-labelledby="cta-title">
          <div className="cta-card">
            <h3 id="cta-title">Следующий шаг</h3>
            <p>Это презентация без формы заявки. Дальше — живой разбор на ваших сделках с командой НейроРОПа.</p>
            <button type="button" className="primary" onClick={() => setOpen(false)}>
              Понятно
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
