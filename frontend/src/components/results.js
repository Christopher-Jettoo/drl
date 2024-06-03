import React from "react";

function Results({ formData }) {
  const styles = {
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    resultsGroup: {
      marginBottom: "20px",
      border: "1px solid #ccc",
      padding: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ccc",
      padding: "8px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ccc",
      padding: "8x",
    },
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Here are your results:</h2>
      </div>

      <div style={styles.resultsGroup}>
        <div style={styles.header}>
          <h3>Happiness Levels</h3>
        </div>
        <p>Happiness Today: {formData.currentResponse.happy} </p>
        <p>
          Overall Happiness: {Math.ceil(formData.averageResponse.avg_happy)}
        </p>
        <p>
          Compared to Others of Similar age:{" "}
          {Math.ceil(formData.avgOfSimilarAge.avg_happy)}{" "}
        </p>
      </div>
      <div style={styles.header}>
        <h3>Energy Levels</h3>
      </div>
      <div style={styles.resultsGroup}>
        <p>Energy level Today: {formData.currentResponse.energy} </p>
        <p>
          Overall Energy Level: {Math.ceil(formData.averageResponse.avg_energy)}
        </p>
        <p>
          Compared to Others of Similar age:{" "}
          {Math.ceil(formData.avgOfSimilarAge.avg_energy)}{" "}
        </p>
      </div>

      <div style={styles.resultsGroup}>
        <div style={styles.header}>
          <h3>Hopefullness Levels</h3>
        </div>
        <p>Hopefullness Today: {formData.currentResponse.hope} </p>
        <p>
          Overall Hopefullness: {Math.ceil(formData.averageResponse.avg_hope)}
        </p>
        <p>
          Compared to Others of Similar age:{" "}
          {Math.ceil(formData.avgOfSimilarAge.avg_hope)}{" "}
        </p>
      </div>

      <div style={styles.resultsGroup}>
        <div style={styles.header}>
          <h3>Hours Slept Data</h3>
        </div>
        <p>
          Total Hours Of Sleep Today: {formData.currentResponse.sleep_hours}
        </p>
        <p>
          Overall Hours Of Sleep:{" "}
          {Math.ceil(formData.averageResponse.avg_sleep_hours)}
        </p>
        <p>
          Compared to Others of Similar age:{" "}
          {Math.ceil(formData.avgOfSimilarAge.avg_sleep_hours)}{" "}
        </p>
      </div>

      <div style={styles.resultsGroup}>
        <h2 style={styles.header}>Summary by Age Range</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Age Range</th>
              <th style={styles.th}>Average Happiness</th>
              <th style={styles.th}>Average Energy Levels</th>
              <th style={styles.th}>Average Hopefulness</th>
              <th style={styles.th}>Average Sleep hours</th>
            </tr>
          </thead>
          <tbody>
            {formData.ageGroupAverages.map((group, index) => (
              <tr key={index}>
                <td style={styles.td}>{group.ageRange}</td>
                <td style={styles.td}>{group.avg_happy}</td>
                <td style={styles.td}>{group.avg_energy}</td>
                <td style={styles.td}>{group.avg_hope}</td>
                <td style={styles.td}>{group.avg_sleep_hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;
