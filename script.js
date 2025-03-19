document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const menuIcon = document.querySelector('.menu-icon');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      // Change menu icon to X when menu is open
      if (mobileNav.classList.contains('active')) {
        menuIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
      } else {
        menuIcon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
      }
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
          // Close mobile menu if open
          mobileNav.classList.remove('active');
          menuIcon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
          
          // Scroll to section
          const yOffset = -80; // Header height offset
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTopBtn.classList.add('visible');
      } else {
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Video thumbnail click
    if (videoThumbnail) {
      videoThumbnail.addEventListener('click', function() {
        window.open('https://youtu.be/P22HqM9w500?si=tF5uqeX2Ojb6Iakf', '_blank');
      });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-content, .info-card, .weapon-card, .team-item');
    
    const revealOnScroll = function() {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial styles for reveal elements
    revealElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call reveal function on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
  
    // Create custom weapon section images
    function createWeaponImages() {
      // Shooting and recoil section
      const shootingCard = document.querySelector('.weapon-card:nth-child(1) .weapon-image-container');
      if (shootingCard) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 200);
        gradient.addColorStop(0, '#ff4d00');
        gradient.addColorStop(1, '#7928ca');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 200);
        
        // Draw recoil pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, 180);
        
        // Create a spray pattern
        for (let i = 0; i < 20; i++) {
          const x = 200 + Math.sin(i * 0.5) * (i * 3);
          const y = 180 - i * 8;
          ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        // Add bullet points
        for (let i = 0; i < 20; i++) {
          const x = 200 + Math.sin(i * 0.5) * (i * 3);
          const y = 180 - i * 8;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
        
        // Add rifle silhouette
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(120, 160, 160, 20);
        
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.className = 'weapon-image';
        img.alt = 'Стрельба и отдача';
        
        // Replace placeholder with canvas image
        const oldImg = shootingCard.querySelector('img');
        if (oldImg) {
          shootingCard.replaceChild(img, oldImg);
        } else {
          shootingCard.appendChild(img);
        }
      }
      
      // Grenades section
      const grenadesCard = document.querySelector('.weapon-card:nth-child(2) .weapon-image-container');
      if (grenadesCard) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 200);
        gradient.addColorStop(0, '#00b4d8');
        gradient.addColorStop(1, '#0077b6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 200);
        
        // Draw smoke effect
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 400;
          const y = Math.random() * 200;
          const radius = Math.random() * 20 + 5;
          
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
          ctx.fill();
        }
        
        // Draw grenade icons
        function drawGrenade(x, y, color) {
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        drawGrenade(100, 100, 'rgba(100, 100, 100, 0.8)'); // Smoke
        drawGrenade(200, 80, 'rgba(255, 100, 0, 0.8)'); // HE
        drawGrenade(300, 120, 'rgba(255, 200, 0, 0.8)'); // Flash
        drawGrenade(150, 150, 'rgba(255, 0, 0, 0.8)'); // Molotov
        
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.className = 'weapon-image';
        img.alt = 'Гранаты и утилиты';
        
        // Replace placeholder with canvas image
        const oldImg = grenadesCard.querySelector('img');
        if (oldImg) {
          grenadesCard.replaceChild(img, oldImg);
        } else {
          grenadesCard.appendChild(img);
        }
      }
      
      // Tickrate section
      const tickrateCard = document.querySelector('.weapon-card:nth-child(3) .weapon-image-container');
      if (tickrateCard) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 200);
        gradient.addColorStop(0, '#ffb700');
        gradient.addColorStop(1, '#ff7b00');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 200);
        
        // Draw network visualization
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        
        // Draw server
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(170, 70, 60, 60);
        
        // Draw clients
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(50, 30, 40, 40);
        ctx.fillRect(50, 130, 40, 40);
        ctx.fillRect(310, 30, 40, 40);
        ctx.fillRect(310, 130, 40, 40);
        
        // Draw connections
        ctx.beginPath();
        ctx.moveTo(90, 50);
        ctx.lineTo(170, 100);
        ctx.moveTo(90, 150);
        ctx.lineTo(170, 100);
        ctx.moveTo(310, 50);
        ctx.lineTo(230, 100);
        ctx.moveTo(310, 150);
        ctx.lineTo(230, 100);
        ctx.stroke();
        
        // Draw tick rate visualization
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(350, 190);
        ctx.stroke();
        
        for (let i = 0; i < 30; i++) {
          const x = 60 + i * 10;
          const height = Math.sin(i * 0.5) * 20 + 30;
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(x, 190 - height, 4, height);
        }
        
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.className = 'weapon-image';
        img.alt = 'Тикрейт и сетевой код';
        
        // Replace placeholder with canvas image
        const oldImg = tickrateCard.querySelector('img');
        if (oldImg) {
          tickrateCard.replaceChild(img, oldImg);
        } else {
          tickrateCard.appendChild(img);
        }
      }
    }
    
    // Create weapon images on load
    window.addEventListener('load', createWeaponImages);
  });