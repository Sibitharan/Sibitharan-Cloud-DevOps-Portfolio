# Sibitharan S — Cloud & DevOps Engineer Portfolio

🌐 **Live Portfolio:** https://d2fhefe3et52ix.cloudfront.net/

👨‍💻 **GitHub:** https://github.com/Sibitharan

💼 **LinkedIn:** https://www.linkedin.com/in/sibitharans26

---

## 📌 About This Project

This repository contains my personal Cloud & DevOps engineering portfolio, designed to showcase my practical experience in AWS Cloud, DevOps automation, CI/CD, Linux, Python, cloud infrastructure, and cloud-native application development.

The portfolio is built as a static web application and deployed on AWS using Amazon S3 and Amazon CloudFront. The deployment process is automated using GitHub Actions and AWS OpenID Connect (OIDC), eliminating the need to store long-term AWS access keys in GitHub.

The project demonstrates how modern DevOps practices can be applied to a real-world personal application from source code management to automated cloud deployment.

---

## 🎯 Project Objectives

- Build a professional Cloud & DevOps engineering portfolio.
- Demonstrate practical AWS cloud deployment skills.
- Implement automated CI/CD using GitHub Actions.
- Secure GitHub-to-AWS authentication using OIDC.
- Deploy static web content to Amazon S3.
- Deliver content globally through Amazon CloudFront.
- Automate CloudFront cache invalidation after deployments.
- Implement AWS IAM least-privilege deployment permissions.
- Monitor AWS spending using AWS Budgets.
- Provide a working contact form using Formspree.

---

## 🏗️ Architecture

```text
Developer
    │
    │ Git Push
    ▼
GitHub Repository
    │
    │ Push to main
    ▼
GitHub Actions
    │
    │ OIDC Authentication
    ▼
AWS IAM Role
    │
    │ Temporary Credentials
    ▼
Amazon S3
    │
    │ Static Website Files
    ▼
Amazon CloudFront
    │
    │ Global Content Delivery
    ▼
Website Visitors
