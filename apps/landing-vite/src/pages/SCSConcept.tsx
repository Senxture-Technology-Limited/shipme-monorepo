import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Calculator,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  LockKeyhole,
  MessageSquareText,
  Plane,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import './scs-concept.css';

const SAMPLE_MESSAGE = `你好，想問香港寄英國 Manchester。
2 箱衣物樣辦，每箱 40 × 30 × 25 cm、3.2 kg。
想用 DHL，星期五前上門收件。
公司：Northstar Trading`;

const money = new Intl.NumberFormat('zh-HK', {
  style: 'currency',
  currency: 'HKD',
  maximumFractionDigits: 0,
});

type DemoStage = 'input' | 'processing' | 'review' | 'approved';

type QuoteData = {
  destination: string;
  carrier: string;
  pieces: number;
  dimensions: string;
  weightPerPiece: number;
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  company: string;
};

function extractQuoteData(message: string): QuoteData {
  const pieces = Number(message.match(/(\d+)\s*箱/)?.[1] ?? 2);
  const dimensionsMatch = message.match(
    /(\d+)\s*[×xX*]\s*(\d+)\s*[×xX*]\s*(\d+)\s*(?:cm|厘米)?/i,
  );
  const dimensions = dimensionsMatch
    ? dimensionsMatch.slice(1, 4).join(' × ')
    : '40 × 30 × 25';
  const [length, width, height] = dimensions
    .split(' × ')
    .map((value) => Number(value));
  const weightPerPiece = Number(
    message.match(/每箱[^\d]*(\d+(?:\.\d+)?)\s*(?:kg|公斤)/i)?.[1] ?? 3.2,
  );
  const actualWeight = pieces * weightPerPiece;
  const volumetricWeight = (pieces * length * width * height) / 5000;
  const destination = /manchester/i.test(message)
    ? '英國 · Manchester'
    : /英國|uk|united kingdom/i.test(message)
      ? '英國'
      : '待確認';
  const carrier =
    message.match(/\b(DHL|UPS|FEDEX)\b/i)?.[1]?.toUpperCase() ?? 'DHL';
  const company =
    message.match(/公司[：:]\s*([^\n]+)/)?.[1]?.trim() ?? '待確認';

  return {
    destination,
    carrier,
    pieces,
    dimensions,
    weightPerPiece,
    actualWeight,
    volumetricWeight,
    chargeableWeight: Math.max(actualWeight, volumetricWeight),
    company,
  };
}

function SCSConcept() {
  const [message, setMessage] = useState(SAMPLE_MESSAGE);
  const [stage, setStage] = useState<DemoStage>('input');
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const quote = useMemo(() => extractQuoteData(message), [message]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'SCS 報價流程概念示範';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const pricing = useMemo(() => {
    const baseFreight = quote.chargeableWeight * 68;
    const fuelSurcharge = baseFreight * 0.265;
    const demandSurcharge = quote.chargeableWeight * 16.5;
    const documentation = 50;
    const total =
      baseFreight + fuelSurcharge + demandSurcharge + documentation;

    return {
      baseFreight,
      fuelSurcharge,
      demandSurcharge,
      documentation,
      total,
    };
  }, [quote.chargeableWeight]);

  const analyse = () => {
    setStage('processing');
    window.setTimeout(() => setStage('review'), 850);
  };

  const reset = () => {
    setMessage(SAMPLE_MESSAGE);
    setStage('input');
    setShowMessagePreview(false);
  };

  return (
    <main className="scs-demo">
      <div className="scs-grid" aria-hidden="true" />
      <header className="scs-topbar">
        <a className="scs-wordmark" href="#top" aria-label="SCS concept demo">
          <span>SCS</span>
          <small>WORKFLOW CONCEPT</small>
        </a>
        <div className="scs-disclaimer">
          <LockKeyhole size={13} />
          非官方 · 私人概念示範
        </div>
      </header>

      <section className="scs-hero" id="top">
        <div className="scs-eyebrow">
          <span>01</span>
          報價流程自動化
        </div>
        <h1>
          一封 WhatsApp，
          <br />
          變成一份<span>可確認嘅報價。</span>
        </h1>
        <p>
          為偉邦國際速遞構想嘅操作流程：AI 先整理客戶資料及計算收費，
          員工保留最後確認權。
        </p>
        <div className="scs-flowline" aria-label="示範流程">
          <div className={stage === 'input' ? 'is-current' : 'is-done'}>
            <span>1</span> 收到詢價
          </div>
          <ArrowRight size={16} />
          <div
            className={
              stage === 'processing'
                ? 'is-current'
                : stage === 'review' || stage === 'approved'
                  ? 'is-done'
                  : ''
            }
          >
            <span>2</span> AI 整理及計價
          </div>
          <ArrowRight size={16} />
          <div
            className={
              stage === 'review'
                ? 'is-current'
                : stage === 'approved'
                  ? 'is-done'
                  : ''
            }
          >
            <span>3</span> 人手確認
          </div>
          <ArrowRight size={16} />
          <div className={stage === 'approved' ? 'is-current' : ''}>
            <span>4</span> 發送客戶
          </div>
        </div>
      </section>

      <section className="scs-workbench">
        <div className="scs-panel scs-inbox">
          <div className="scs-panel-heading">
            <div>
              <span className="scs-kicker">INBOX / 09:42</span>
              <h2>客戶詢價</h2>
            </div>
            <MessageSquareText size={22} />
          </div>

          <label htmlFor="customer-message">WhatsApp 訊息</label>
          <textarea
            id="customer-message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setStage('input');
            }}
            aria-describedby="privacy-note"
          />

          <div className="scs-privacy" id="privacy-note">
            <ShieldCheck size={15} />
            示範只使用虛構客戶資料
          </div>

          <button
            className="scs-primary-button"
            type="button"
            onClick={analyse}
            disabled={stage === 'processing' || message.trim().length === 0}
          >
            {stage === 'processing' ? (
              <>
                <span className="scs-spinner" />
                正在整理資料及計價
              </>
            ) : (
              <>
                <Sparkles size={18} />
                AI 分析詢價
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <button className="scs-reset" type="button" onClick={reset}>
            <RotateCcw size={14} />
            重設示範
          </button>
        </div>

        <div
          className={`scs-panel scs-quote ${
            stage === 'input' || stage === 'processing' ? 'is-waiting' : ''
          }`}
          aria-live="polite"
        >
          {stage === 'input' || stage === 'processing' ? (
            <div className="scs-empty-state">
              <div className="scs-orbit">
                <Calculator size={28} />
              </div>
              <span>QUOTE DRAFT</span>
              <h2>
                {stage === 'processing'
                  ? '正在核對收費規則…'
                  : '報價草稿會喺呢度出現'}
              </h2>
              <p>系統不會自動發送；每份報價都要由操作員確認。</p>
            </div>
          ) : (
            <>
              <div className="scs-panel-heading">
                <div>
                  <span className="scs-kicker">QUOTE / DRAFT #Q-1048</span>
                  <h2>{quote.company}</h2>
                </div>
                {stage === 'approved' ? (
                  <span className="scs-status approved">
                    <CheckCircle2 size={15} />
                    已確認
                  </span>
                ) : (
                  <span className="scs-status">
                    <Clock3 size={15} />
                    待確認
                  </span>
                )}
              </div>

              <div className="scs-route">
                <div>
                  <small>寄件地</small>
                  <strong>香港 HKG</strong>
                </div>
                <div className="scs-route-line">
                  <Plane size={18} />
                </div>
                <div>
                  <small>目的地</small>
                  <strong>{quote.destination}</strong>
                </div>
              </div>

              <div className="scs-facts">
                <div>
                  <Box size={17} />
                  <span>
                    <small>件數</small>
                    {quote.pieces} 箱
                  </span>
                </div>
                <div>
                  <span>
                    <small>每箱尺寸</small>
                    {quote.dimensions} cm
                  </span>
                </div>
                <div>
                  <span>
                    <small>實重</small>
                    {quote.actualWeight.toFixed(1)} kg
                  </span>
                </div>
                <div>
                  <span>
                    <small>計費重量</small>
                    {quote.chargeableWeight.toFixed(1)} kg
                  </span>
                </div>
              </div>

              <div className="scs-price-list">
                <div>
                  <span>{quote.carrier} 基本運費</span>
                  <strong>{money.format(pricing.baseFreight)}</strong>
                </div>
                <div>
                  <span>燃油附加費 <em>示範 26.5%</em></span>
                  <strong>{money.format(pricing.fuelSurcharge)}</strong>
                </div>
                <div className="is-highlighted">
                  <span>旺季附加費 <em>$16.50 / kg</em></span>
                  <strong>{money.format(pricing.demandSurcharge)}</strong>
                </div>
                <div>
                  <span>文件處理</span>
                  <strong>{money.format(pricing.documentation)}</strong>
                </div>
                <div className="scs-total">
                  <span>預計總額 <small>HKD</small></span>
                  <strong>{money.format(pricing.total)}</strong>
                </div>
              </div>

              <div className="scs-review-note">
                <AlertTriangle size={17} />
                <span>
                  <strong>需要人手確認</strong>
                  衣物樣辦嘅申報價值及商業發票
                </span>
              </div>

              {stage === 'approved' ? (
                <div className="scs-approved">
                  <Check size={19} />
                  報價已確認，可由操作員發送俾客戶
                  <button
                    type="button"
                    onClick={() => setShowMessagePreview(true)}
                  >
                    <Send size={16} />
                    預覽訊息
                  </button>
                </div>
              ) : (
                <button
                  className="scs-approve-button"
                  type="button"
                  onClick={() => setStage('approved')}
                >
                  <Check size={18} />
                  確認報價草稿
                </button>
              )}
            </>
          )}
        </div>
      </section>

      <section className="scs-rule-source">
        <div>
          <FileText size={20} />
          <span>
            <small>目前套用規則</small>
            DHL Demand Surcharge · 2026-09-01
          </span>
        </div>
        <div className="scs-rule-meta">
          <span>規則來源：偉邦公開通知</span>
          <a
            href="https://scsexpress.com/index.php?Charset=UTF8%2F"
            target="_blank"
            rel="noreferrer"
          >
            查看原文 <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {showMessagePreview && (
        <div
          className="scs-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowMessagePreview(false);
            }
          }}
        >
          <section
            className="scs-message-preview"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-preview-title"
          >
            <div className="scs-message-preview-heading">
              <div>
                <span className="scs-kicker">WHATSAPP / READY TO SEND</span>
                <h2 id="message-preview-title">客戶訊息預覽</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowMessagePreview(false)}
                aria-label="關閉訊息預覽"
              >
                <X size={19} />
              </button>
            </div>
            <div className="scs-message-bubble">
              <p>{quote.company} 你好，</p>
              <p>
                香港寄往 {quote.destination} 嘅 {quote.carrier}{' '}
                報價已經準備好：
              </p>
              <p>
                {quote.pieces} 箱 · 計費重量{' '}
                {quote.chargeableWeight.toFixed(1)} kg
                <br />
                預計運費：<strong>{money.format(pricing.total)}</strong>
                <br />
                預計運送時間：2–3 個工作天
              </p>
              <p>
                價格已包括示範附加費，正式寄件前我哋會再確認申報價值及商業發票。
              </p>
            </div>
            <div className="scs-message-actions">
              <span>
                <ShieldCheck size={15} />
                仍需由操作員按發送
              </span>
              <button type="button" onClick={() => setShowMessagePreview(false)}>
                完成預覽
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="scs-footer">
        <p>
          此頁為獨立製作嘅非官方概念示範，與偉邦國際速遞有限公司未有合作或認可關係。
          所有客戶及價目資料均為示範用途，正式報價以公司確認為準。
        </p>
        <span>CONCEPT v0.1 · OCT 2026</span>
      </footer>
    </main>
  );
}

export default SCSConcept;
