import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Htet Lin Ko — Full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FCF9EC";
const BONE = "#0B0B0C";
const MUTED = "#6B665C";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BG,
          color: BONE,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>HLK / 2026</span>
          <span>Yangon · UTC+6:30</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
            }}
          >
            <svg
              width={110}
              height={110}
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                stroke={BONE}
                strokeWidth={11}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 44 52 L 168 80" />
                <path d="M 44 52 L 92 168" />
                <path d="M 168 80 L 92 168" />
                <path d="M 168 80 L 128 40" />
              </g>
              <g fill={BONE}>
                <circle cx={44} cy={52} r={9} />
                <circle cx={168} cy={80} r={9} />
                <circle cx={92} cy={168} r={9} />
                <circle cx={128} cy={40} r={7} />
              </g>
            </svg>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                Portfolio · 2026
              </span>
              <span
                style={{
                  fontFamily: "serif",
                  fontSize: 128,
                  lineHeight: 1,
                  color: BONE,
                }}
              >
                Htet Lin Ko
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 900,
            }}
          >
            <span
              style={{
                fontFamily: "serif",
                fontSize: 40,
                lineHeight: 1.2,
                color: BONE,
              }}
            >
              Full-stack engineer.
            </span>
            <span
              style={{
                fontFamily: "serif",
                fontSize: 32,
                lineHeight: 1.3,
                color: MUTED,
              }}
            >
              Shipping HR SaaS at Better HR and building end-to-end systems on
              the side.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>htetlinko.com</span>
          <span>Senior Frontend · Better HR</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
