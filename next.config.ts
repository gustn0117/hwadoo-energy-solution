import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 셀프호스팅 배포
  output: "standalone",
  experimental: {
    // 관리자 설치사례 이미지 업로드(최대 10MB) + multipart 여유분
    serverActions: { bodySizeLimit: "11mb" },
  },
};

export default nextConfig;
