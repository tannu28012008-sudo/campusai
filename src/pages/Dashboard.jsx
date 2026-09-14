/*
 * Campus AI Dashboard — genuinely merged version
 *
 * Merge basis:
 * - Preserves the functionality present in the 736-line Dashboard.jsx.
 * - Includes the additional functionality from the 1174-line Dashboard.jsx.
 * - Where both files implemented the same block differently, the expanded/newer
 *   implementation is kept to prevent duplicate state, handlers, or JSX.
 */
import { ThemeToggle } from "../ThemeContext";
import { useEffect, useRef, useState } from "react";
import AIPage from "./AIPage";
import Profile from "./Profile";
import InformationInput from "./InformationInput";

function Dashboard() {
  const updatesRef = useRef(null);
  const [saved, setSaved] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState("day");
  const [showSaved, setShowSaved] = useState(false);
  const [sourceNotice, setSourceNotice] = useState(null);
  const [noticeStatus, setNoticeStatus] = useState({});
  const [reminders, setReminders] = useState([]);
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);


  const askCampusAI = () => {
    const text = question.trim();

    if (!text || isThinking) return;

    setChatMessages((current) => [
      ...current,
      {
        role: "user",
        text,
      },
    ]);

    setQuestion("");
    setIsThinking(true);

    setTimeout(() => {
      let answer =
        "I couldn't find this information in the available campus notices.";

      const lower = text.toLowerCase();

      if (
        lower.includes("exam") ||
        lower.includes("examination")
      ) {
        answer =
          "The Semester Examination Schedule has been released. Please check your examination schedule. The current notice shows a deadline of 20 September 2026.";
      } else if (
        lower.includes("assignment") ||
        lower.includes("deadline")
      ) {
        answer =
          "Your assignment submission deadline is 18 September 2026. Please submit your assignment before the deadline.";
      } else if (
        lower.includes("coding") ||
        lower.includes("club")
      ) {
        answer =
          "The Campus Coding Club Meetup is scheduled for 19 September 2026. You can view the details from the campus updates.";
      }

      setChatMessages((current) => [
        ...current,
        {
          role: "ai",
          text: answer,
        },
      ]);

      setIsThinking(false);
    }, 1200);
  };
  const askSuggestedQuestion = (text) => {
    setQuestion(text);

    setTimeout(() => {
      const input = document.querySelector(".ai-question-input");
      input?.focus();
    }, 50);
  };

  const openNotification = (notification) => {
    setShowNotifications(false);
    setShowSaved(false);
    setFilter("all");
    setSearch("");

    const notice = notices.find(
      (item) => item.id === notification.id
    );

    if (notice) {
      setSelectedNotice(notice);

      setTimeout(() => {
        updatesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };
  const [search, setSearch] = useState("");
  const handleSmartSearch = (value) => {
    setSearch(value);

    const text = value.toLowerCase();

    if (text.includes("exam") || text.includes("test")) {
      setFilter("urgent");
    } else if (
      text.includes("deadline") ||
      text.includes("assignment") ||
      text.includes("submit")
    ) {
      setFilter("important");
    } else if (
      text.includes("club") ||
      text.includes("event") ||
      text.includes("activity")
    ) {
      setFilter("general");
    } else {
      setFilter("all");
    }
  };
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [dashboardPage, setDashboardPage] = useState("home");
  const [department, setDepartment] = useState("Information Technology");
  const [year, setYear] = useState("2nd Year");
  const [group, setGroup] = useState("Group 1");
  const [interests, setInterests] = useState("Technology, Coding");
  const [role, setRole] = useState("Student");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const toggleReminder = (id) => {
    setReminders((current) =>
      current.includes(id)
        ? current.filter((reminderId) => reminderId !== id)
        : [...current, id]
    );
  };
  const updateNoticeStatus = (id, status) => {
    setNoticeStatus((current) => ({
      ...current,
      [id]: status,
    }));
  };
  const duplicateGroups = {
    1: "exam-schedule",
    2: "assignment-deadline",
    3: "coding-club",
  };
  const showLoadingDemo = () => {
    setIsLoading(true);
    setHasError(false);

    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const showErrorDemo = () => {
    setIsLoading(false);
    setHasError(true);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/notices")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dashboard loaded");
        console.log("Backend notices:", data);
        setBackendNotices(data);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
      });
  }, []);
  const [backendNotices, setBackendNotices] = useState([]);
  const notices = [
    {
      id: 1,
      priority: "URGENT",
      title: "Semester Examination Schedule Released",
      text: "The end-semester examination schedule has been published. Check your subjects and plan accordingly.",
      deadline: "20 September 2026",
      action: "Check Schedule",
      type: "urgent",
      reason:
        "You're seeing this because this examination update applies to your current year and department.",
      aiConfidence: "High",
      needsVerification: false,
      priorityScore: 95,
    },
    {
      id: 2,
      priority: "IMPORTANT",
      title: "Assignment Submission Reminder",
      text: "Your Data Structures assignment submission deadline is approaching.",
      deadline: "18 September 2026",
      action: "Submit Assignment",
      type: "important",
      reason:
        "You're seeing this because this assignment is relevant to your current course.",
      aiConfidence: "High",
      needsVerification: false,
      priorityScore: 95,
    },
    {
      id: 3,
      priority: "GENERAL",
      title: "Campus Coding Club Meetup",
      text: "The Coding Club is hosting a campus meetup this Friday for students interested in technology.",
      deadline: "19 September 2026",
      action: "View Details",
      type: "general",
      reason:
        "You're seeing this because you're interested in technology and campus activities.",
      aiConfidence: "High",
      needsVerification: false,
      priorityScore: 95,
    },
  ];
  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Exam Schedule Released",
      text: "Your semester examination schedule is available.",
    },
    {
      id: 2,
      type: "deadline",
      title: "Assignment Deadline",
      text: "Assignment submission is due on 18 September 2026.",
    },
    {
      id: 3,
      type: "new",
      title: "Coding Club Meetup",
      text: "A new campus activity may interest you.",
    },
  ];
  const noticesToShow = showSaved
    ? notices.filter((notice) => saved.includes(notice.id))
    : notices;
  const missedNotices = notices.filter(
    (notice) =>
      notice.type !== "general" &&
      noticeStatus[notice.id] !== "Completed"
  );

  const filteredNotices = noticesToShow.filter((notice) => {
    const matchesSearch =
      `${notice.title} ${notice.text} ${notice.action}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || notice.type === filter;

    return matchesSearch && matchesFilter;
  });
  const toggleSave = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  if (dashboardPage === "ai") {
    return (
      <AIPage
        onBack={() => setDashboardPage("home")}
      />
    );
  }
  if (dashboardPage === "profile") {
    return (
      <Profile
        role={role}
        onRoleChange={setRole}
        onBack={() => setDashboardPage("home")}
        department={department}
        year={year}
        group={group}
        interests={interests}
        onSave={(data) => {
          setDepartment(data.department);
          setYear(data.year);
          setGroup(data.group);
          setInterests(data.interests);
        }}
      />
    );
  }
  if (dashboardPage === "information") {
    return (
      <InformationInput
        onBack={() => setDashboardPage("home")}
      />
    );
  }
  return (
    <div className="campus-dashboard">


      {/* HEADER */}
      <header className="dashboard-topbar">
        <div className="dashboard-logo">
          Campus<span>AI</span>
        </div>

        <button
          className="notification-button"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
          <span className="notification-count">
            {notifications.length}
          </span>
        </button>
        {showNotifications && (
          <div className="notification-panel">
            <div className="notification-panel-header">
              <div>
                <span>NOTIFICATIONS</span>
                <h3>Recent Updates</h3>
              </div>

              <button
                onClick={() => setShowNotifications(false)}
              >
                ×
              </button>
            </div>

            <div className="notification-list">
              {notifications.map((notification) => (
                <div
                  className={`notification-item ${notification.type}`}
                  key={notification.id}
                  onClick={() => openNotification(notification)}
                >
                  <div className="notification-dot"></div>

                  <div>
                    <strong>{notification.title}</strong>
                    <p>{notification.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="student-profile"
          onClick={() => setDashboardPage("profile")}
        >
          <div className="role-badge">
            {role}
          </div>
          <div className="profile-avatar">S</div>
          <div>
            <strong>Student</strong>
            <small>{department} • {year} • {group}</small>
          </div>
        </div>
      </header>


      {/* WELCOME */}
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">YOUR PERSONAL CAMPUS</span>

          <h1>
            Good Morning, <span>Student</span> 👋
          </h1>

          <p>
            Here’s what needs your attention today.
          </p>
        </div>

        <button
          className="ask-ai-button"
          onClick={() => setDashboardPage("ai")}
        >
          ✨ Ask CampusAI
        </button>
      </section>
      <div className="day-week-toggle">
        <button
          className={viewMode === "day" ? "active" : ""}
          onClick={() => setViewMode("day")}
        >
          My Day
        </button>

        <button
          className={viewMode === "week" ? "active" : ""}
          onClick={() => setViewMode("week")}
        >
          My Week
        </button>
      </div>
      <div className="day-week-content">
        {viewMode === "day" ? (
          <>
            <div className="glance-header">
              <div>
                <span className="section-eyebrow">TODAY</span>
                <h2>Today at a Glance</h2>
                <p>Here’s what needs your attention right now.</p>
              </div>
            </div>

            <div className="glance-grid">

              {/* URGENT */}
              <div
                className="glance-card urgent"
                onClick={() => {
                  setFilter("urgent");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">!</div>

                <div className="glance-info">
                  <span>URGENT</span>
                  <strong>
                    {notices.filter((notice) => notice.type === "urgent").length}
                  </strong>
                  <p>Needs your attention</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* DEADLINES */}
              <div
                className="glance-card deadline"
                onClick={() => {
                  setFilter("all");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">◷</div>

                <div className="glance-info">
                  <span>DEADLINES</span>
                  <strong>
                    {
                      notices.filter(
                        (notice) => notice.deadline && notice.type !== "general"
                      ).length
                    }
                  </strong>
                  <p>Upcoming deadlines</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* MISSED */}
              <div
                className="glance-card missed"
                onClick={() => {
                  setFilter("important");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">◌</div>

                <div className="glance-info">
                  <span>MISSED</span>
                  <strong>{missedNotices.length}</strong>
                  <p>Important update</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* SAVED */}
              <div
                className="glance-card saved"
                onClick={() => {
                  setShowSaved(true);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">★</div>

                <div className="glance-info">
                  <span>SAVED</span>
                  <strong>{saved.length}</strong>
                  <p>Your saved notices</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="glance-header">
              <div>
                <span className="section-eyebrow">THIS WEEK</span>
                <h2>This Week</h2>
                <p>Important updates and upcoming deadlines.</p>
              </div>
            </div>

            <div className="week-summary">
              <div>
                <strong>{notices.length}</strong>
                <span>Updates</span>
              </div>

              <div>
                <strong>
                  {notices.filter((notice) => notice.deadline).length}
                </strong>
                <span>Deadlines</span>
              </div>

              <div>
                <strong>{saved.length}</strong>
                <span>Saved</span>
              </div>
            </div>
          </>
        )}
      </div>


      {/* STATS */}
      <section className="dashboard-stats">

        <div className="dashboard-stat"
        >
          <div className="stat-icon">!</div>
          <div>
            <strong>01</strong>
            <span>Urgent</span>
          </div>
        </div>

        <div className="dashboard-stat">
          <div className="stat-icon">◷</div>
          <div>
            <strong>02</strong>
            <span>Deadlines</span>
          </div>
        </div>

        <div className="dashboard-stat">
          <div className="stat-icon">✦</div>
          <div>
            <strong>04</strong>
            <span>New Updates</span>
          </div>
        </div>

        <div className="dashboard-stat"
          onClick={() => {
            setShowSaved(true);
            setTimeout(() => {
              updatesRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}>
          <div className="stat-icon">★</div>
          <div>
            <strong>{saved.length}</strong>
            <span>Saved</span>
          </div>
        </div>

      </section>

      {/* BEFORE VS AFTER */}
      <section className="before-after-section">
        <div className="before-after-header">
          <span className="section-label">CAMPUSAI DIFFERENCE</span>
          <h2>From scattered information to clear action.</h2>
          <p>See how CampusAI transforms a typical campus notice.</p>
        </div>

        <div className="before-after-grid">

          {/* BEFORE */}
          <div className="before-after-card before-card">
            <span className="before-after-label">BEFORE CAMPUSAI</span>

            <h3>Raw Campus Notice</h3>

            <div className="raw-notice">
              <strong>NOTICE</strong>
              <p>
                All students are hereby informed that the end semester
                examinations will be conducted as per the schedule uploaded
                by the examination department. Students are advised to check
                the schedule and make necessary preparations.
              </p>
            </div>

            <div className="before-problem">
              <span>⚠</span>
              <p>Important details are buried inside the notice.</p>
            </div>
          </div>

          {/* AFTER */}
          <div className="before-after-card after-card">
            <span className="before-after-label">AFTER CAMPUSAI</span>

            <h3>What matters to you</h3>

            <div className="ai-result">
              <div className="ai-result-row">
                <span>WHAT HAPPENED</span>
                <strong>Semester Examination Schedule Released</strong>
              </div>

              <div className="ai-result-row">
                <span>WHAT YOU NEED TO DO</span>
                <strong>Check your examination schedule</strong>
              </div>

              <div className="ai-result-row">
                <span>DEADLINE</span>
                <strong>20 September 2026</strong>
              </div>
            </div>

            <div className="after-benefit">
              <span>✦</span>
              <p>Personalized, summarized and actionable.</p>
            </div>
          </div>

        </div>
      </section>
      {/* AI DAILY BRIEF */}
      <section className="daily-brief">

        <div className="brief-top">
          <div className="brief-icon">✦</div>

          <div>
            <div className="brief-heading">
              <span>AI DAILY BRIEF</span>
              <small>Updated just now</small>
            </div>

            <h2>Here’s what matters to you today.</h2>
          </div>
        </div>

        <div className="brief-items">

          <div className="brief-item urgent">
            <div className="brief-item-icon">!</div>
            <div>
              <span>URGENT</span>
              <strong>Semester Examination Schedule Released</strong>
              <p>Check your examination schedule.</p>
            </div>
          </div>

          <div className="brief-item deadline">
            <div className="brief-item-icon">◷</div>
            <div>
              <span>DEADLINE</span>
              <strong>Assignment Submission</strong>
              <p>Due in 2 days • Submit your assignment.</p>
            </div>
          </div>

          <div className="brief-item general">
            <div className="brief-item-icon">✦</div>
            <div>
              <span>RECOMMENDED</span>
              <strong>Coding Club Meetup</strong>
              <p>19 September • View details.</p>
            </div>
          </div>

        </div>

        <div className="brief-footer">
          <span>✨ Personalized using your campus information</span>
          <button>View all updates →</button>
        </div>

      </section>
      {/* AI Q&A */}
      <section className="quick-actions">
        <div>
          <span className="section-label">QUICK ACTIONS</span>
          <h2>Manage Campus Information</h2>
          <p>Add notices or PDFs for CampusAI to process.</p>
        </div>

        <button
          className="quick-action-button"
          onClick={() => setDashboardPage("information")}
        >
          + Add Information
        </button>
      </section>

      {/* MAIN CONTENT */}
      <div className="dashboard-content"
        ref={updatesRef}>
        <div className="dashboard-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search campus information..."
            value={search}
            onChange={(e) => handleSmartSearch(e.target.value)}
          />
        </div>
        <div className="updates-header">
          <div>
            <span className="section-label">CAMPUS INFORMATION</span>
            <h2>{showSaved ? "Saved Notices" : "Important Updates"}</h2>
            {showSaved && (
              <button
                className="show-all-button"
                onClick={() => setShowSaved(false)}
              >
                ← Show All Notices
              </button>
            )}
          </div>

          <button
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter <span>⌄</span>
          </button>
          {showFilter && (
            <div className="filter-menu">
              <button
                onClick={() => {
                  setFilter("all");
                  setShowFilter(false);
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilter("urgent");
                  setShowFilter(false);
                }}
              >
                Urgent
              </button>

              <button
                onClick={() => {
                  setFilter("important");
                  setShowFilter(false);
                }}
              >
                Important
              </button>

              <button
                onClick={() => {
                  setFilter("general");
                  setShowFilter(false);
                }}
              >
                General
              </button>
            </div>
          )}
        </div>
        {selectedNotice && (
          <div
            className="reason-overlay"
            onClick={() => setSelectedNotice(null)}
          >
            <div
              className={`reason-card ${selectedNotice.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="reason-close"
                onClick={() => setSelectedNotice(null)}
              >
                ×
              </button>

              <div className="reason-sparkle">✦</div>

              <span className="reason-label">PERSONALIZED FOR YOU</span>

              <h2>Why am I seeing this?</h2>

              <p>{selectedNotice.reason}</p>

              <div className="reason-notice">
                <strong>{selectedNotice.title}</strong>
                <span>CampusAI personalization</span>
              </div>

              <button
                className="reason-done"
                onClick={() => setSelectedNotice(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
        {sourceNotice && (
          <div
            className="source-overlay"
            onClick={() => setSourceNotice(null)}
          >
            <div
              className="source-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="source-close"
                onClick={() => setSourceNotice(null)}
              >
                ×
              </button>

              <div className="source-icon">
                📄
              </div>

              <span className="source-label">
                ORIGINAL CAMPUS NOTICE
              </span>

              <h2>{sourceNotice.title}</h2>

              <div className="source-status">
                <span>✓</span>
                Authorized Campus Source
              </div>

              <div className="source-details">
                <div>
                  <span>SOURCE</span>
                  <strong>College Administration</strong>
                </div>

                <div>
                  <span>NOTICE TYPE</span>
                  <strong>{sourceNotice.priority}</strong>
                </div>

                <div>
                  <span>PUBLISHED</span>
                  <strong>13 September 2026</strong>
                </div>
              </div>

              <div className="source-original">
                <span>ORIGINAL NOTICE</span>
                <p>{sourceNotice.text}</p>
              </div>

              <button
                className="source-done"
                onClick={() => setSourceNotice(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* MISSED INFORMATION */}
        <div className="missed-information-card">
          <div className="missed-icon">!</div>

          <div className="missed-content">
            <span>MISSED INFORMATION</span>

            <h3>
              You missed {missedNotices.length} important{" "}
              {missedNotices.length === 1 ? "update" : "updates"}
            </h3>

            <p>
              {missedNotices.length === 0
                ? "You're all caught up. Great job!"
                : "These updates still need your attention."}
            </p>
          </div>

          {missedNotices.length > 0 && (
            <button
              className="missed-view-button"
              onClick={() => {
                setShowSaved(false);
                setFilter("all");
                setSearch("");
                updatesRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              View Updates →
            </button>
          )}
        </div>
        {/* INFORMATION TIMELINE */}
        <div className="information-timeline">
          <div className="timeline-header">
            <div>
              <span>INFORMATION TIMELINE</span>
              <h2>Recent Updates</h2>
            </div>
            <span className="timeline-count">
              {filteredNotices.length} Updates
            </span>
          </div>

          <div className="timeline-line">


            <div className="timeline-line">
              {isLoading ? (
                <div className="state-card loading-state">
                  <div className="loading-spinner"></div>
                  <h3>Updating Campus Information...</h3>
                  <p>CampusAI is processing the latest authorized updates.</p>
                </div>
              ) : hasError ? (
                <div className="state-card error-state">
                  <div className="state-icon">!</div>
                  <h3>Couldn't load updates</h3>
                  <p>Something went wrong while loading campus information.</p>
                  <button onClick={() => setHasError(false)}>
                    Try Again
                  </button>
                </div>
              ) : filteredNotices.length === 0 ? (
                <div className="state-card empty-state">
                  <div className="state-icon">⌕</div>
                  <h3>No relevant updates found</h3>
                  <p>Try changing your search or filters.</p>
                </div>
              ) : (
                filteredNotices.map((notice) => (
                  <div className="timeline-item" key={`timeline-${notice.id}`}>
                    <div className={`timeline-dot ${notice.type}`}></div>

                    <div className="timeline-content">
                      <span className={`timeline-priority ${notice.type}`}>
                        {notice.priority}
                      </span>

                      <h3>{notice.title}</h3>
                      <p>{notice.text}</p>

                      <div className="ai-summary">
                        <span>✦ AI SUMMARY</span>

                        <div className="summary-row">
                          <strong>What happened?</strong>
                          <p>{notice.text}</p>
                        </div>

                        <div className="summary-row">
                          <strong>What do I need to do?</strong>
                          <p>{notice.action}</p>
                        </div>

                        <div className="summary-row">
                          <strong>By when?</strong>
                          <p>{notice.deadline}</p>
                        </div>
                      </div>

                      <small>Deadline: {notice.deadline}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* NOTICE CARDS */}

        <div className="notice-list">
          {showSaved && (
            <div className="saved-info">
              <h3>Saved Notices</h3>
              <p>
                {saved.length === 0
                  ? "You haven't saved any notices yet."
                  : `You have saved ${saved.length} notice${saved.length > 1 ? "s" : ""}.`}
              </p>
            </div>
          )}
          {!isLoading && !hasError && filteredNotices.length === 0 && (
            <div className="no-results">
              <h3>No campus information found</h3>
              <p>Try searching with a different keyword.</p>
            </div>
          )}

          {filteredNotices.map((notice) => (
            <article
              className={`campus-notice ${notice.type}`}
              key={notice.id}
            >

              <div className="notice-header">

                <span className={`notice-priority ${notice.type}`}>
                  {notice.priority}
                </span>

                <button
                  className={`save-button ${saved.includes(notice.id) ? "saved" : ""
                    }`}
                  onClick={() => toggleSave(notice.id)}
                >
                  {saved.includes(notice.id) ? "★" : "☆"}
                </button>

              </div>

              <h3>{notice.title}</h3>

              <p>{notice.text}</p>
              {duplicateGroups[notice.id] && (
                <div className="duplicate-notice-badge">
                  🔗 Unified Notice
                  <span>Information from multiple authorized sources</span>
                </div>
              )}
              <div className="ai-trust-indicator">
                <span className="ai-trust-icon">
                  {notice.needsVerification ? "⚠️" : "✓"}
                </span>

                <div>
                  <strong>
                    {notice.needsVerification
                      ? "Needs Verification"
                      : `AI Confidence: ${notice.aiConfidence}`}
                  </strong>

                  <small>
                    {notice.needsVerification
                      ? "This information should be verified before acting."
                      : "AI processing completed with high confidence."}
                  </small>
                </div>
              </div>

              <div className="notice-meta">

                <div>
                  <span>DEADLINE</span>
                  <strong>{notice.deadline}</strong>
                  {reminders.includes(notice.id) && (
                    <small className="reminder-active">
                      🔔 Reminder set for this deadline
                    </small>
                  )}
                </div>

                <div>
                  <span>ACTION</span>
                  <strong>{notice.action}</strong>
                </div>

              </div>

              <div className="notice-footer">
                <button onClick={() => setSelectedNotice(notice)}>
                  Why am I seeing this?
                </button>

                <button onClick={() => toggleReminder(notice.id)}>
                  {reminders.includes(notice.id)
                    ? "🔔 Reminder On"
                    : "🔕 Set Reminder"}
                </button>
                <button onClick={() => setSourceNotice(notice)}>
                  View Source →
                </button>

                <div className="notice-status">
                  <span className="status-label">STATUS</span>

                  <div className="status-steps">
                    {["Pending", "In Progress", "Completed"].map((status) => {
                      const currentStatus = noticeStatus[notice.id];
                      const isActive = currentStatus === status;

                      return (
                        <button
                          key={status}
                          className={`status-step ${isActive ? "active" : ""}`}
                          onClick={() => {
                            if (isActive) {
                              // Same status clicked again → unselect
                              setNoticeStatus((current) => {
                                const updated = { ...current };
                                delete updated[notice.id];
                                return updated;
                              });
                            } else {
                              updateNoticeStatus(notice.id, status);
                            }
                          }}
                        >
                          <span className="status-dot">
                            {isActive ? "✓" : ""}
                          </span>

                          <span>{status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </article>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;