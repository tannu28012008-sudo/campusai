import { useState } from "react";

function Profile({
    onBack,
    department,
    year,
    group,
    interests,
    onSave,
    role,
    onRoleChange,
}) {
    const [departmentValue, setDepartmentValue] = useState(department);
    const [yearValue, setYearValue] = useState(year);
    const [groupValue, setGroupValue] = useState(group);
    const [interestsValue, setInterestsValue] = useState(interests);

    const handleSave = () => {
        onSave({
            department: departmentValue,
            year: yearValue,
            group: groupValue,
            interests: interestsValue,
        });

        onBack();
    };

    return (
        <main className="profile-page">

            <button className="profile-back-button" onClick={onBack}>
                ← Back to Dashboard
            </button>

            <div className="profile-header">
                <div className="profile-large-avatar">S</div>

                <span>PERSONALIZATION SETTINGS</span>

                <h1>Make CampusAI Yours</h1>

                <p>
                    Tell CampusAI about your academic profile and interests.
                    We'll use this information to show more relevant campus updates.
                </p>
            </div>

            <section className="profile-card">

                <div className="personalization-intro">
                    <div className="personalization-icon">✦</div>

                    <div>
                        <strong>Personalized Information</strong>
                        <p>
                            Your profile helps CampusAI decide which announcements
                            matter most to you.
                        </p>
                    </div>
                </div>

                <div className="profile-field">
                    <label>Department</label>

                    <select
                        value={departmentValue}
                        onChange={(e) => setDepartmentValue(e.target.value)}
                    >
                        <option>Information Technology</option>
                    </select>
                </div>

                <div className="profile-field">
                    <label>Academic Year</label>

                    <select
                        value={yearValue}
                        onChange={(e) => setYearValue(e.target.value)}
                    >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>
                </div>

                <div className="profile-field">
                    <label>Group</label>

                    <select
                        value={groupValue}
                        onChange={(e) => setGroupValue(e.target.value)}
                    >
                        <option>Group 1</option>
                        <option>Group 2</option>
                    </select>
                </div>

                <div className="profile-field full-width">
                    <label>Interests</label>

                    <input
                        type="text"
                        value={interestsValue}
                        onChange={(e) => setInterestsValue(e.target.value)}
                        placeholder="e.g. Coding, AI, Technology"
                    />

                    <small>
                        Add topics you care about so CampusAI can surface relevant
                        activities and announcements.
                    </small>
                </div>

                <div className="personalization-preview">
                    <span>AI PERSONALIZATION</span>

                    <strong>
                        Your dashboard will adapt to these preferences.
                    </strong>

                    <p>
                        Department • Year • Group • Interests
                    </p>
                </div>
                <div className="role-setting">
                    <label>Access Role</label>

                    <select
                        value={role}
                        onChange={(e) => onRoleChange(e.target.value)}
                    >
                        <option>Student</option>
                        <option>Faculty</option>
                        <option>Admin</option>
                    </select>
                </div>
                <button
                    className="profile-save-button"
                    onClick={handleSave}
                >
                    Save Preferences →
                </button>

            </section>
        </main>
    );
}

export default Profile;