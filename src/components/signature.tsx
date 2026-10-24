// Brittany Signature has no tilde glyph (it maps "ã" to a plain "a"),
// so the tilde and the signature swoosh are drawn by hand.
export function Signature() {
  return (
    <span className="signature">
      Rodrigo Gouveia Estev
      <span className="signature-tilde">
        a
        <svg aria-hidden="true" viewBox="0 0 20 8" preserveAspectRatio="none">
          <path d="M1 6 C 4 1, 8 1, 10 4 S 16 7, 19 2" />
        </svg>
      </span>
      o
      <svg className="signature-line" aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none">
        <path d="M2 12 C 50 11, 118 8, 198 5" />
      </svg>
    </span>
  );
}
