
const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
    });
    await waveContract.deployed();
    
    console.log(`Deployed WavePortal at ${waveContract.address}`);
    // console.log(`Owner Address: ${owner.address}`);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("A message");
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave("Second message");
    await waveTxn2.wait();

    // waveCount = await waveContract.getTotalWaves();

    // waveTxn = await waveContract.connect(randomPerson).wave();

    // const[_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave("Another message");
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract Balance:", hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();