import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import axios from "axios";
import './DataGraph.css';

const DataGraph = ({ currentItem, closePopup }) => {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(typeof(currentItem.title))
        var text = currentItem.title.replaceAll("\\n","");
        // console.log(text.)
        // console.log(currentItem.title.replaceAll("\n"," "))
        const response = await axios.get(`http://localhost:8080/similar_nodes/${text}`, {
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        });
        const relatedItems = response.data;

        const nodes = [];
        const edges = [];
        let nodeId = 1;
        console.log({relatedItems:relatedItems})
        const createNodesAndEdges = (parent, items) => {
          for (const item of items) {
            const node = { id: nodeId, label: item.id, title: item.title,authors:item.authors,doi:item.doi };
            nodes.push(node);
            edges.push({ from: parent, to: nodeId });
            nodeId++;

            if (item.similar_recommendations && item.similar_recommendations.length > 0) {
              createNodesAndEdges(node.id, item.similar_recommendations);
            }
          }
        };

        nodes.push({ id: nodeId, label: currentItem.id, title: currentItem.title,authors:currentItem.authors,doi:currentItem.doi,shape:"circle"});
        nodeId++;

        createNodesAndEdges(1, relatedItems.nodes);
        setGraph({ nodes, edges });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentItem]);

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    // height: "500px",
    // configure: {},    // defined in the configure module.
    //     edges: {width: function (edge) {
    //       // Set edge width based on similarity
    //       return edge.similarity * 5; // Multiply by a factor to adjust the width
    //     },
    // },        // defined in the edges module.
    // nodes: {},        // defined in the nodes module.
    // groups: {},       // defined in the groups module.
    layout: {},       // defined in the layout module.
    interaction: {},  // defined in the interaction module.
    manipulation: {}, // defined in the manipulation module.
    physics: {},      // defined in the physics module.
    clickToUse: true
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log(nodes, edges);
    },
    // selectNode: function(event) {
    //   console.log(event.nodes);
    // },
    selectNode: function (event) {
      const { nodes } = event;
      const tooltip = document.getElementById("tooltip");

      if (nodes.length > 0) {
        const nodeId = nodes[0];
        const node = graph.nodes.find((n) => n.id === nodeId);

        if (node && node.title) {
          console.log({node:node});
          tooltip.innerText = node.title;
          var doiUrl = `https://www.doi.org/${node.doi}`
          tooltip.innerHTML = `
          <div class="tooltip-content">
            <p class="tooltip-title"><strong id="strong-title">Title:</strong> ${node.title.replaceAll("\\n","")}</p>
            <p class="tooltip-authors"><strong>Authors:</strong> ${node.authors.replaceAll("\\n","")}</p>
            <p class="tooltip-doi"><strong>DOI:</strong> <a href="https://www.doi.org/${node.doi}" target="_blank">${node.doi}</a></p>
          </div>`;
        tooltip.style.display = 'block';
          // tooltip.style.top = `${event.event.clientY}px`;
          // tooltip.style.left = `${event.event.clientX}px`;
        }
      } else {
        tooltip.style.display = "none";
      }
    },
    blurNode: function () {
      const tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },

  };



  const handleTooltipClose = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
    closePopup(); // Call the closePopup function passed as a prop
  };

  const handleNodeSelect = (event) => {
    const { nodes } = event;
    const tooltip = document.getElementById("tooltip");
    const popupContainer = document.querySelector(".popup-container");
  
    if (nodes.length > 0) {
      const nodeId = nodes[0];
      const node = graph.nodes.find((n) => n.id === nodeId);
  
      if (node && node.title) {
        tooltip.innerHTML = `
        <p><strong>Authors: </strong>${node.authors.replaceAll("\\n","")}</p>`;

        tooltip.style.display = "block";
      }
    } else {
      tooltip.style.display = "none";
    }
  };
  

  const handleBlurNode = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        {/* Graph Component */}
        <div className = "graph-container">
        <Graph graph={graph} options={options} events={{
          selectNode: handleNodeSelect,
          blurNode: handleBlurNode,
          ...events
        }} />
        </div>
        <div id="tooltip" className="tooltip-container">
        </div>
      </div>
      {/* Tooltip */}
      <button onClick={handleTooltipClose} className='close-button'>X</button>
    </div>
  );
};

export default DataGraph;
