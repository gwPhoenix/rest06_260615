import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ color: '#fff', marginBottom: 16 }}>
              <span className="mark" />
              CODEWAVE
            </div>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 14.5, lineHeight: 1.7, maxWidth: 260 }}>
              배움과 성장 사이의 거리를 0으로.<br />
              결과로 증명하는 코딩 교육 플랫폼.
            </p>
          </div>
          <div className="footer-col">
            <h5>강좌</h5>
            <ul>
              <li><Link to="/courses">전체 강좌</Link></li>
              <li><Link to="/courses?cat=코딩">코딩 부트캠프</Link></li>
              <li><Link to="/courses?cat=자격증">자격증</Link></li>
              <li><Link to="/courses?cat=컴퓨터활용">컴퓨터활용</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>회사</h5>
            <ul>
              <li><Link to="/about">회사소개</Link></li>
              <li><Link to="/instructors">강사진</Link></li>
              <li><Link to="/reviews">수강후기</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>고객센터</h5>
            <ul>
              <li><a href="mailto:hello@codewave.kr">hello@codewave.kr</a></li>
              <li><span style={{ color: 'rgba(255,255,255,.55)' }}>평일 10:00 – 18:00</span></li>
              <li><a href="#">자주 묻는 질문</a></li>
              <li><a href="#">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 CODEWAVE. All rights reserved.</span>
          <span>사업자등록번호 000-00-00000 | 통신판매업신고 제2025-서울-00000호</span>
        </div>
      </div>
    </footer>
  )
}
