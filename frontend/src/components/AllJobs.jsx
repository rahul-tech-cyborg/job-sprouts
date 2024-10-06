import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/list`);
        if (response.data.success) {
          setAllJobs(response.data.allJobs.reverse());
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);
  const formatDate = (dateString) => {

    const date = new Date(Number(dateString));

    if (isNaN(date.getTime())) {
      return "Date Not Specified";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 p-4 sm:ml-[50px] sm:me-[50px]">
      {allJobs.length > 0 ? (
        allJobs.map((ithJob, index) => (
          <div key={index} style={styles.jobCard}>
            <div style={styles.imageContainer}>
              <img
                src={ithJob.image[0]}
                alt={ithJob.company_name}
                style={styles.companyImage}
              />
              <div style={styles.dateContainer}>Date : {formatDate(ithJob.date)}</div>
            </div>
            <div style={styles.detailsContainer}>
              <h3 style={styles.companyName}>
                Company Name: {ithJob.company_name}
              </h3>
              <p style={styles.jobDetail}>Role: {ithJob.job_role}</p>
              <p style={styles.jobDetail}>
                Location: {ithJob.location || "Not specified"}
              </p>
              <p style={styles.jobDetail}>
                Batch: {ithJob.batch || "Not specified"}
              </p>
              <p style={styles.jobDetail}>
                Salary: {ithJob.income || "Not specified"}
              </p>
              <a
                href={ithJob.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.applyLink}
              >
                Apply Now
              </a>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noJobsText}>No jobs available</p>
      )}
    </div>
  );
};

const styles = {
  jobCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    border: "1px solid black",
  },
  imageContainer: {
    position: "relative", // Set position relative for absolute positioning of date
    width: "100%",
    height: "200px",
    overflow: "hidden",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  dateContainer: {
    position: "absolute", // Absolute positioning for the date
    top: "10px", // Adjust as needed
    right: "10px", // Adjust as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Background for better visibility
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  companyImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  detailsContainer: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  companyName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2c3e50",
  },
  jobDetail: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "8px",
  },
  applyLink: {
    fontSize: "16px",
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "bold",
  },
  noJobsText: {
    color: "#7f8c8d",
    fontSize: "18px",
  },
};

export default AllJobs;
