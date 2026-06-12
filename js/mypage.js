// js/mypage.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.mypage-nav-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 이동 방지
            
            // 모든 탭 패널 및 링크의 active 클래스 제거
            navLinks.forEach(item => item.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 사용자가 선택한 메뉴에 active 클래스 부여 (브랜드 컬러 활성화)
            link.classList.add('active');

            // 연결된 패널을 찾아 active 클래스 부여
            const targetId = link.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 리뷰 별점 클릭 로직
    const stars = document.querySelectorAll('#star-selector span');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            
            // 모든 별 초기화 후 클릭한 별점까지 active
            stars.forEach(s => {
                if(parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
});

let currentReviewBtnId = null;

// 리뷰 모달 열기
window.openReviewModal = function(productName, btnId) {
    const modal = document.getElementById('review-modal');
    const productNameEl = document.getElementById('modal-product-name');
    
    // 모달 데이터 채우기
    productNameEl.textContent = productName;
    currentReviewBtnId = btnId;
    
    // 별점 및 텍스트 초기화
    document.querySelectorAll('#star-selector span').forEach(s => s.classList.remove('active'));
    document.getElementById('review-textarea').value = '';
    
    modal.classList.add('active');
};

// 리뷰 모달 닫기
window.closeReviewModal = function() {
    const modal = document.getElementById('review-modal');
    modal.classList.remove('active');
};

// 리뷰 제출
window.submitReview = function() {
    const text = document.getElementById('review-textarea').value;
    const activeStars = document.querySelectorAll('#star-selector span.active').length;
    
    if (activeStars === 0) {
        alert("별점을 선택해주세요.");
        return;
    }
    
    if (text.length < 10) {
        alert("리뷰 내용을 최소 10자 이상 작성해주세요.");
        return;
    }

    // 전역의 showToast가 있으면 호출(main.js에 정의됨)
    if (typeof showToast === 'function') {
        showToast("리뷰가 등록되었으며, 500P가 지급되었습니다!");
    } else {
        alert("리뷰가 등록되었으며, 500P가 지급되었습니다!");
    }
    
    // 작성 완료된 버튼 상태 변경
    if (currentReviewBtnId) {
        const btn = document.getElementById(currentReviewBtnId);
        if (btn) {
            btn.textContent = "작성 완료";
            btn.classList.add("disabled");
            btn.onclick = null; // 이벤트 제거
        }
    }
    
    closeReviewModal();
};
