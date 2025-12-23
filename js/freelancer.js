/**
 * GloAfrix - Freelancer Registration with Admin Approval
 */

let profilePicture = null;
let portfolioImages = [];

document.addEventListener('DOMContentLoaded', function() {
    const profileInput = document.getElementById('profilePicture');
    const portfolioInput = document.getElementById('portfolioImages');
    const registerForm = document.getElementById('freelancerRegisterForm');
    
    if (profileInput) {
        profileInput.addEventListener('change', handleProfilePicture);
    }
    
    if (portfolioInput) {
        portfolioInput.addEventListener('change', handlePortfolioImages);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleFreelancerSubmit);
    }
});

/**
 * Handle Profile Picture Upload
 */
function handleProfilePicture(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validate
    if (!file.type.startsWith('image/')) {
        showNotification('Please upload an image file');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        showNotification('Profile picture must be less than 2MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        profilePicture = {
            file: file,
            dataUrl: e.target.result
        };
        
        // Show preview
        const preview = document.getElementById('profilePreview');
        preview.innerHTML = `
            <div class="profile-preview-image">
                <img src="${e.target.result}" alt="Profile">
                <button type="button" class="remove-image-btn" onclick="removeProfilePicture()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

/**
 * Remove Profile Picture
 */
function removeProfilePicture() {
    profilePicture = null;
    document.getElementById('profilePreview').innerHTML = '';
    document.getElementById('profilePreview').style.display = 'none';
    document.getElementById('profilePicture').value = '';
}

/**
 * Handle Portfolio Images Upload
 */
function handlePortfolioImages(event) {
    const files = Array.from(event.target.files);
    
    // Limit to 5 images
    if (portfolioImages.length + files.length > 5) {
        showNotification('Maximum 5 portfolio images allowed');
        return;
    }
    
    files.forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('Please upload only image files');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Each image must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                file: file,
                dataUrl: e.target.result,
                id: Date.now() + Math.random()
            };
            
            portfolioImages.push(imageData);
            displayPortfolioPreview(imageData);
        };
        reader.readAsDataURL(file);
    });
    
    event.target.value = '';
}

/**
 * Display Portfolio Image Preview
 */
function displayPortfolioPreview(imageData) {
    const grid = document.getElementById('portfolioPreviewGrid');
    
    const item = document.createElement('div');
    item.className = 'image-preview-item';
    item.innerHTML = `
        <img src="${imageData.dataUrl}" alt="Portfolio">
        <button type="button" class="remove-image-btn" onclick="removePortfolioImage('${imageData.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    item.dataset.imageId = imageData.id;
    
    grid.appendChild(item);
    grid.style.display = 'grid';
}

/**
 * Remove Portfolio Image
 */
function removePortfolioImage(imageId) {
    portfolioImages = portfolioImages.filter(img => img.id != imageId);
    
    const item = document.querySelector(`[data-image-id="${imageId}"]`);
    if (item) {
        item.remove();
    }
    
    const grid = document.getElementById('portfolioPreviewGrid');
    if (portfolioImages.length === 0) {
        grid.style.display = 'none';
    }
}

/**
 * Handle Freelancer Registration Submit
 */
function handleFreelancerSubmit(event) {
    event.preventDefault();
    
    // Validate profile picture
    if (!profilePicture) {
        showNotification('Please upload a profile picture');
        return;
    }
    
    // Get form data
    const freelancerData = {
        personalInfo: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            profilePicture: profilePicture.dataUrl
        },
        professionalInfo: {
            title: document.getElementById('professionalTitle').value,
            category: document.getElementById('serviceCategory').value,
            hourlyRate: parseFloat(document.getElementById('hourlyRate').value),
            bio: document.getElementById('bio').value,
            skills: document.getElementById('skills').value.split(',').map(s => s.trim())
        },
        portfolio: {
            images: portfolioImages.map(img => img.dataUrl),
            links: document.getElementById('portfolioLinks').value.split('\n').filter(l => l.trim())
        },
        applicationStatus: 'pending', // pending, approved, rejected
        submittedAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null
    };
    
    // Save to localStorage (Phase 1)
    // Phase 2: Send to WordPress API for admin approval
    saveFreelancerApplication(freelancerData);
    
    // Show success message
    showNotification('Application submitted successfully! You will receive an email once approved.');
    
    // Redirect to confirmation page
    setTimeout(() => {
        window.location.href = 'application-submitted.html';
    }, 2000);
}

/**
 * Save Freelancer Application to Local Storage
 * Phase 2: Replace with WordPress API call
 */
function saveFreelancerApplication(data) {
    try {
        let applications = JSON.parse(localStorage.getItem('freelancer_applications') || '[]');
        applications.push(data);
        localStorage.setItem('freelancer_applications', JSON.stringify(applications));
        
        // Also save to pending queue
        let pending = JSON.parse(localStorage.getItem('pending_freelancers') || '[]');
        pending.push(data);
        localStorage.setItem('pending_freelancers', JSON.stringify(pending));
    } catch (e) {
        console.error('Failed to save application:', e);
    }
}

/**
 * ADMIN FUNCTIONS
 * These would be in admin panel in Phase 2
 */

/**
 * Get All Pending Applications (Admin Only)
 */
function getPendingApplications() {
    try {
        return JSON.parse(localStorage.getItem('pending_freelancers') || '[]');
    } catch (e) {
        console.error('Failed to load applications:', e);
        return [];
    }
}

/**
 * Approve Freelancer Application (Admin Only)
 */
function approveFreelancer(applicationEmail) {
    try {
        // Get pending applications
        let pending = JSON.parse(localStorage.getItem('pending_freelancers') || '[]');
        
        // Find and remove from pending
        const applicationIndex = pending.findIndex(app => app.personalInfo.email === applicationEmail);
        if (applicationIndex === -1) {
            console.error('Application not found');
            return false;
        }
        
        const application = pending[applicationIndex];
        pending.splice(applicationIndex, 1);
        
        // Update status
        application.applicationStatus = 'approved';
        application.approvedAt = new Date().toISOString();
        application.approvedBy = 'Admin'; // Phase 2: Use actual admin ID
        
        // Add to approved freelancers (will show in services)
        let approved = JSON.parse(localStorage.getItem('approved_freelancers') || '[]');
        approved.push(application);
        localStorage.setItem('approved_freelancers', JSON.stringify(approved));
        
        // Update pending list
        localStorage.setItem('pending_freelancers', JSON.stringify(pending));
        
        // Phase 2: Send approval email via WordPress
        console.log('Freelancer approved:', application.personalInfo.email);
        
        return true;
    } catch (e) {
        console.error('Failed to approve freelancer:', e);
        return false;
    }
}

/**
 * Reject Freelancer Application (Admin Only)
 */
function rejectFreelancer(applicationEmail, reason) {
    try {
        let pending = JSON.parse(localStorage.getItem('pending_freelancers') || '[]');
        
        const applicationIndex = pending.findIndex(app => app.personalInfo.email === applicationEmail);
        if (applicationIndex === -1) {
            console.error('Application not found');
            return false;
        }
        
        const application = pending[applicationIndex];
        pending.splice(applicationIndex, 1);
        
        // Update status
        application.applicationStatus = 'rejected';
        application.rejectedAt = new Date().toISOString();
        application.rejectionReason = reason;
        
        // Save to rejected list
        let rejected = JSON.parse(localStorage.getItem('rejected_freelancers') || '[]');
        rejected.push(application);
        localStorage.setItem('rejected_freelancers', JSON.stringify(rejected));
        
        // Update pending list
        localStorage.setItem('pending_freelancers', JSON.stringify(pending));
        
        // Phase 2: Send rejection email via WordPress
        console.log('Freelancer rejected:', application.personalInfo.email);
        
        return true;
    } catch (e) {
        console.error('Failed to reject freelancer:', e);
        return false;
    }
}

/**
 * Get Approved Freelancers (Shows in Services Page)
 */
function getApprovedFreelancers() {
    try {
        return JSON.parse(localStorage.getItem('approved_freelancers') || '[]');
    } catch (e) {
        console.error('Failed to load approved freelancers:', e);
        return [];
    }
}

/**
 * Phase 2: WordPress Integration
 */
/*
async function submitFreelancerToWordPress(data) {
    try {
        const response = await fetch('/wp-json/gloafrix/v1/freelancer-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Send confirmation email
            await sendApplicationEmail(data.personalInfo.email);
        }
        
        return result;
    } catch (error) {
        console.error('Submission failed:', error);
        throw error;
    }
}

// Admin Approval Endpoint
async function approveFreelancerWordPress(applicationId) {
    const response = await fetch(`/wp-json/gloafrix/v1/freelancer-application/${applicationId}/approve`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAdminToken(),
            'Content-Type': 'application/json'
        }
    });
    
    return await response.json();
}
*/